import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { getCompanyNotificationEmail, getClientAutoReplyEmail } from "./email-templates.ts";

const ALLOWED_ORIGINS = [
  "https://cladprimeco.ie",
  "https://www.cladprimeco.ie",
  "https://clad-primeco.vercel.app",
];

function getCorsOrigin(req: Request): string {
  const origin = req.headers.get("Origin") ?? "";
  return ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
}

const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW_HOURS = 1;

function buildCorsHeaders(req: Request) {
  return {
    "Access-Control-Allow-Origin": getCorsOrigin(req),
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey, x-supabase-client",
  };
}

Deno.serve(async (req: Request) => {
  const corsHeaders = buildCorsHeaders(req);

  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  // Only allow POST
  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "method_not_allowed", message: "Only POST requests are accepted." }),
      { status: 405, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  // --- 0. Check required environment variables ---
  const requiredEnvVars = ["HCAPTCHA_SECRET", "SUPABASE_URL", "SUPABASE_SERVICE_ROLE_KEY"];
  for (const key of requiredEnvVars) {
    if (!Deno.env.get(key)) {
      console.error(`[contact] Missing required env var: ${key}`);
      return new Response(
        JSON.stringify({ error: "server_config_error", message: "Service temporarily unavailable. Please contact us directly at cladprimeco@outlook.com." }),
        { status: 503, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
  }

  // --- 1. Parse body ---
  let name: string, email: string, phone: string, service: string, message: string, hcaptchaToken: string;
  try {
    const body = await req.json();
    name         = (body.name         ?? "").trim();
    email        = (body.email        ?? "").trim();
    phone        = (body.phone        ?? "").trim();
    service      = (body.service      ?? "").trim();
    message      = (body.message      ?? "").trim();
    hcaptchaToken = (body.hcaptchaToken ?? "").trim();
  } catch {
    return new Response(
      JSON.stringify({ error: "invalid_body", message: "Request body must be valid JSON." }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  // --- 2. Validate required fields ---
  if (!name || !email || !message || !hcaptchaToken) {
    return new Response(
      JSON.stringify({ error: "missing_fields", message: "Name, email, message and hCaptcha token are required." }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  // Basic email format check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return new Response(
      JSON.stringify({ error: "invalid_email", message: "Please provide a valid email address." }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  // Message length validation
  if (message.length < 10) {
    return new Response(
      JSON.stringify({ error: "invalid_message", message: "Message must be at least 10 characters." }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
  if (message.length > 5000) {
    return new Response(
      JSON.stringify({ error: "invalid_message", message: "Message must not exceed 5000 characters." }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  // --- 3. Verify hCaptcha token ---
  const hcaptchaSecret = Deno.env.get("HCAPTCHA_SECRET") ?? "";
  let hcaptchaVerified = false;
  try {
    const verifyRes = await fetch("https://hcaptcha.com/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret: hcaptchaSecret,
        response: hcaptchaToken,
      }),
    });
    const verifyData = await verifyRes.json();
    hcaptchaVerified = verifyData.success === true;
    if (!hcaptchaVerified) {
      console.warn("[contact] hCaptcha failed. error-codes:", verifyData["error-codes"] ?? "none", "secret set:", !!hcaptchaSecret);
    }
  } catch {
    // If hCaptcha verification call fails, reject the request
    return new Response(
      JSON.stringify({ error: "captcha_error", message: "Could not verify hCaptcha. Please try again." }),
      { status: 503, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  if (!hcaptchaVerified) {
    return new Response(
      JSON.stringify({ error: "captcha_failed", message: "hCaptcha verification failed. Please try again." }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  // --- 4. Extract client IP ---
  const ip: string | null =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    req.headers.get("x-real-ip") ??
    req.headers.get("cf-connecting-ip") ??
    null;

  // --- 5. Initialise Supabase client (service role — bypasses RLS) ---
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
  );

  // --- 6. Rate limiting: max 3 submissions per IP per hour ---
  if (ip) {
    const windowStart = new Date(
      Date.now() - RATE_LIMIT_WINDOW_HOURS * 60 * 60 * 1000
    ).toISOString();

    try {
      const { count, error: countError } = await supabase
        .from("contact_messages")
        .select("*", { count: "exact", head: true })
        .eq("ip_address", ip)
        .gte("created_at", windowStart);

      if (!countError && count !== null && count >= RATE_LIMIT_MAX) {
        return new Response(
          JSON.stringify({
            error: "rate_limited",
            message: "Too many messages sent from your IP. Please try again in an hour.",
          }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
    } catch {
      // Non-fatal: if rate limit check fails, allow the submission through
    }
  }

  // --- 7. Build the stored message (embed service when provided) ---
  const VALID_SERVICES = ["Kingspan Cladding", "Architectural Panels", "Aluminium Copings & Roof Deck", "Other", ""];
  if (service && !VALID_SERVICES.includes(service)) {
    service = "";
  }
  const storedMessage = service
    ? `Service: ${service}\n\n${message}`
    : message;

  // --- 8. Insert record into database ---
  const { error: insertError } = await supabase.from("contact_messages").insert({
    name,
    email,
    phone: phone || null,
    message: storedMessage,
    ip_address: ip,
    status: "new",
  });

  if (insertError) {
    console.error("[contact] DB insert error:", insertError.message);
    return new Response(
      JSON.stringify({ error: "db_error", message: "Failed to save your message. Please try again." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  // --- 9. Send emails via Resend ---
  const resendApiKey  = Deno.env.get("RESEND_API_KEY") ?? "";
  const companyEmail  = Deno.env.get("COMPANY_EMAIL")  ?? "";

  if (resendApiKey && companyEmail) {
    const submittedAt = new Date().toLocaleString("en-IE", {
      timeZone: "Europe/Dublin",
      dateStyle: "full",
      timeStyle: "short",
    });

    // 9a. Notification email to the company
    try {
      const notifyRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Clad-Primeco Website <onboarding@resend.dev>",
          to: [companyEmail],
          subject: `[Clad-Primeco] New contact — ${name}`,
          html: getCompanyNotificationEmail({
            name,
            email,
            phone,
            service,
            message,
            submittedAt,
            ip: ip ?? "Unknown",
          }),
        }),
      });
      if (!notifyRes.ok) {
        const errBody = await notifyRes.text();
        console.error("[contact] Resend notification error:", errBody);
      }
    } catch (e) {
      console.error("[contact] Resend notification exception:", e instanceof Error ? e.message : e);
    }

    // 9b. Auto-reply email to the client
    try {
      const replyRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Clad-Primeco <onboarding@resend.dev>",
          to: [email],
          subject: "Thank you for contacting Clad-Primeco",
          html: getClientAutoReplyEmail(name),
        }),
      });
      if (!replyRes.ok) {
        const errBody = await replyRes.text();
        console.error("[contact] Resend auto-reply error:", errBody);
      }
    } catch (e) {
      console.error("[contact] Resend auto-reply exception:", e instanceof Error ? e.message : e);
    }
  }

  // --- 10. Success response ---
  return new Response(
    JSON.stringify({ success: true }),
    { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
  );
});
