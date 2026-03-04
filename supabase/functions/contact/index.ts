import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";
import { getCompanyNotificationEmail, getClientAutoReplyEmail } from "./email-templates.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW_HOURS = 1;

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const { name, email, phone, message, hcaptchaToken } = await req.json();

    if (!name || !email || !message || !hcaptchaToken) {
      return new Response(
        JSON.stringify({ message: "Tous les champs sont requis." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const hcaptchaSecret = Deno.env.get("HCAPTCHA_SECRET");
    const verifyRes = await fetch("https://api.hcaptcha.com/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret: hcaptchaSecret ?? "",
        response: hcaptchaToken,
      }),
    });

    const verifyData = await verifyRes.json();
    if (!verifyData.success) {
      return new Response(
        JSON.stringify({ message: "Vérification hCaptcha échouée." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim()
      ?? req.headers.get("cf-connecting-ip")
      ?? null;

    if (ip) {
      const windowStart = new Date(Date.now() - RATE_LIMIT_WINDOW_HOURS * 60 * 60 * 1000).toISOString();
      const { count, error: countError } = await supabase
        .from("contact_messages")
        .select("*", { count: "exact", head: true })
        .eq("ip_address", ip)
        .gte("created_at", windowStart);

      if (!countError && count !== null && count >= RATE_LIMIT_MAX) {
        return new Response(
          JSON.stringify({ message: "Trop de messages envoyés. Veuillez réessayer dans une heure." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
    }

    const { error: insertError } = await supabase.from("contact_messages").insert({
      name,
      email,
      phone: phone ?? "",
      message,
      ip_address: ip,
    });

    if (insertError) {
      throw new Error(insertError.message);
    }

    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    const companyEmail = Deno.env.get("COMPANY_EMAIL");

    if (resendApiKey && companyEmail) {
      const submittedAt = new Date().toLocaleString("en-IE", {
        timeZone: "Europe/Dublin",
        dateStyle: "full",
        timeStyle: "short",
      });

      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Clad-Primeco Website <noreply@cladprimeco.ie>",
          to: [companyEmail],
          subject: `[Clad-Primeco] Nouveau message de contact — ${name}`,
          html: getCompanyNotificationEmail({ name, email, phone: phone ?? "", message, submittedAt }),
        }),
      });

      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Clad-Primeco <noreply@cladprimeco.ie>",
          to: [email],
          subject: "Thank you for contacting Clad-Primeco — We'll be in touch soon",
          html: getClientAutoReplyEmail(name),
        }),
      });
    }

    return new Response(
      JSON.stringify({ message: "Message envoyé avec succès." }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Erreur serveur.";
    return new Response(
      JSON.stringify({ message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
