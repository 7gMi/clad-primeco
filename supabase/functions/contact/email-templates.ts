// ---------------------------------------------------------------------------
// Email templates for the Clad-Primeco contact form Edge Function
// ---------------------------------------------------------------------------

interface CompanyNotificationData {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  submittedAt: string;
  ip: string;
}

/**
 * HTML email sent to the company (cladprimeco@outlook.com) whenever a
 * visitor submits the contact form.
 */
export function getCompanyNotificationEmail(data: CompanyNotificationData): string {
  const phoneRow = data.phone
    ? `<div class="field">
        <div class="field-label">Phone Number</div>
        <div class="field-value">
          <a href="tel:${escapeHtml(data.phone)}" style="color:#2563eb;text-decoration:none;">${escapeHtml(data.phone)}</a>
        </div>
      </div>`
    : "";

  const serviceRow = data.service
    ? `<div class="field">
        <div class="field-label">Service Requested</div>
        <div class="field-value">${escapeHtml(data.service)}</div>
      </div>`
    : "";

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New Contact Message — Clad-Primeco</title>
  <style>
    body { margin:0; padding:0; background-color:#f1f5f9; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif; }
    .wrapper { max-width:600px; margin:40px auto; background-color:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 4px 24px rgba(0,0,0,0.08); }
    .header { background-color:#1e3a5f; padding:32px 40px; }
    .badge { display:inline-block; background-color:#2563eb; color:#ffffff; font-size:11px; font-weight:700; letter-spacing:1px; text-transform:uppercase; padding:4px 10px; border-radius:20px; margin-bottom:12px; }
    .header h1 { margin:0; color:#ffffff; font-size:20px; font-weight:600; letter-spacing:-0.3px; }
    .header p { margin:6px 0 0; color:#93c5fd; font-size:14px; }
    .body { padding:36px 40px; }
    .section-title { font-size:11px; font-weight:700; color:#64748b; letter-spacing:1px; text-transform:uppercase; margin:0 0 16px; }
    .field { margin-bottom:20px; }
    .field-label { font-size:12px; font-weight:600; color:#94a3b8; text-transform:uppercase; letter-spacing:0.5px; margin-bottom:4px; }
    .field-value { font-size:15px; color:#1e293b; font-weight:500; }
    .message-box { background-color:#f8fafc; border:1px solid #e2e8f0; border-left:3px solid #2563eb; border-radius:8px; padding:16px 20px; margin-top:8px; }
    .message-box p { margin:0; font-size:15px; color:#334155; line-height:1.7; white-space:pre-wrap; }
    .cta { margin-top:28px; text-align:center; }
    .cta a { display:inline-block; background-color:#2563eb; color:#ffffff; text-decoration:none; font-weight:600; font-size:14px; padding:12px 28px; border-radius:8px; }
    .divider { height:1px; background-color:#e2e8f0; margin:28px 0; }
    .meta { font-size:12px; color:#94a3b8; line-height:1.6; }
    .footer { background-color:#f8fafc; border-top:1px solid #e2e8f0; padding:20px 40px; text-align:center; }
    .footer p { margin:0; font-size:12px; color:#94a3b8; line-height:1.6; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <span class="badge">New Message</span>
      <h1>You have a new contact request</h1>
      <p>Someone has reached out via the Clad-Primeco website</p>
    </div>
    <div class="body">
      <p class="section-title">Contact Details</p>

      <div class="field">
        <div class="field-label">Full Name</div>
        <div class="field-value">${escapeHtml(data.name)}</div>
      </div>

      <div class="field">
        <div class="field-label">Email Address</div>
        <div class="field-value">
          <a href="mailto:${escapeHtml(data.email)}" style="color:#2563eb;text-decoration:none;">${escapeHtml(data.email)}</a>
        </div>
      </div>

      ${phoneRow}
      ${serviceRow}

      <div class="divider"></div>

      <p class="section-title">Message</p>
      <div class="message-box">
        <p>${escapeHtml(data.message)}</p>
      </div>

      <div class="cta">
        <a href="mailto:${escapeHtml(data.email)}?subject=Re: Your enquiry to Clad-Primeco">Reply to ${escapeHtml(data.name)}</a>
      </div>

      <div class="divider"></div>

      <p class="meta">
        Received: ${escapeHtml(data.submittedAt)}<br />
        IP Address: ${escapeHtml(data.ip)}
      </p>
    </div>
    <div class="footer">
      <p>Clad-Primeco &nbsp;|&nbsp; Dublin, Ireland<br />
      This email was generated automatically from the contact form on cladprimeco.ie</p>
    </div>
  </div>
</body>
</html>`;
}

/**
 * HTML auto-reply email sent to the client immediately after they submit
 * the contact form, confirming receipt and providing company contact details.
 */
export function getClientAutoReplyEmail(clientName: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Thank you for contacting Clad-Primeco</title>
  <style>
    body { margin:0; padding:0; background-color:#f1f5f9; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif; }
    .wrapper { max-width:600px; margin:40px auto; background-color:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 4px 24px rgba(0,0,0,0.08); }
    .header { background-color:#1e3a5f; padding:40px 40px 32px; text-align:center; }
    .checkmark { width:56px; height:56px; background-color:#2563eb; border-radius:50%; display:inline-flex; align-items:center; justify-content:center; margin:0 auto; }
    .header h1 { margin:16px 0 0; color:#ffffff; font-size:22px; font-weight:700; letter-spacing:-0.3px; }
    .header p { margin:8px 0 0; color:#93c5fd; font-size:14px; }
    .body { padding:40px; }
    .body p { margin:0 0 16px; font-size:15px; color:#334155; line-height:1.7; }
    .body p strong { color:#1e293b; }
    .info-box { background-color:#eff6ff; border:1px solid #bfdbfe; border-radius:10px; padding:20px 24px; margin:24px 0; }
    .info-box p { margin:0 0 10px; color:#1e40af; font-size:14px; }
    .info-box p:last-child { margin-bottom:0; }
    .info-box .label { font-weight:700; font-size:11px; text-transform:uppercase; letter-spacing:0.5px; color:#3b82f6; }
    .divider { height:1px; background-color:#e2e8f0; margin:28px 0; }
    .section-label { font-size:13px; font-weight:600; color:#64748b; text-transform:uppercase; letter-spacing:0.5px; margin-bottom:16px; }
    .contact-row { display:flex; gap:12px; margin-bottom:12px; align-items:flex-start; }
    .contact-label { font-size:12px; font-weight:600; color:#64748b; min-width:72px; text-transform:uppercase; letter-spacing:0.5px; padding-top:1px; }
    .contact-value { font-size:14px; color:#1e293b; }
    .contact-value a { color:#2563eb; text-decoration:none; }
    .footer { background-color:#f8fafc; border-top:1px solid #e2e8f0; padding:20px 40px; text-align:center; }
    .footer p { margin:0; font-size:12px; color:#94a3b8; line-height:1.6; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <div class="checkmark">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 6L9 17L4 12" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <h1>Message received!</h1>
      <p>We'll be in touch within 1–2 business days</p>
    </div>
    <div class="body">
      <p>Dear <strong>${escapeHtml(clientName)}</strong>,</p>
      <p>Thank you for reaching out to Clad-Primeco. We have successfully received your enquiry and a member of our team will review it shortly.</p>
      <p>We aim to respond to all enquiries within <strong>1–2 business days</strong>. If your matter is urgent, please don't hesitate to call us directly.</p>

      <div class="info-box">
        <p class="label">What happens next?</p>
        <p>Our team will review your message and prepare a tailored response based on your project requirements.</p>
        <p>If you have additional information to share in the meantime, feel free to reply to this email directly.</p>
      </div>

      <div class="divider"></div>

      <p class="section-label">Contact Information</p>

      <div class="contact-row">
        <span class="contact-label">Phone</span>
        <span class="contact-value">
          <a href="tel:0833468913">083 346 8913</a>
        </span>
      </div>
      <div class="contact-row">
        <span class="contact-label">Email</span>
        <span class="contact-value">
          <a href="mailto:cladprimeco@outlook.com">cladprimeco@outlook.com</a>
        </span>
      </div>
      <div class="contact-row">
        <span class="contact-label">Instagram</span>
        <span class="contact-value">
          <a href="https://www.instagram.com/cladprimeco/" target="_blank" rel="noopener noreferrer">@cladprimeco</a>
        </span>
      </div>
      <div class="contact-row">
        <span class="contact-label">Location</span>
        <span class="contact-value">Dublin, Ireland</span>
      </div>
    </div>
    <div class="footer">
      <p>Clad-Primeco &nbsp;|&nbsp; Dublin, Ireland<br />
      You are receiving this email because you submitted a contact form on cladprimeco.ie</p>
    </div>
  </div>
</body>
</html>`;
}

/**
 * Escapes user-supplied strings before embedding them in HTML to prevent
 * XSS injection in the generated email body.
 */
export function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}
