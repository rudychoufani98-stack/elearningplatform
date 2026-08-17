# Skykapital invitation & password emails

When you create an account in the admin console, the platform automatically
sends the person a **"set your password"** email (Supabase's *Reset Password*
template). The same template is used when a learner clicks "Forgotten
password". Two things make it truly Skykapital-branded:

---

## 1. Custom SMTP — REQUIRED before inviting real users

Supabase's built-in mailer is a test service: **~2 emails per hour**, sent
from `noreply@mail.app.supabase.io`. You must plug in your own sender.

**Recommended: Resend (free tier: 100 emails/day, 3,000/month)**

1. Create an account at https://resend.com
2. *Domains* → *Add domain* → `skykapital.com` → add the DNS records they
   show (SPF + DKIM) at your domain registrar → wait for "Verified".
3. *API Keys* → create one → copy it.
4. Supabase dashboard → **Project Settings → Authentication → SMTP Settings**
   → Enable custom SMTP:
   - Host: `smtp.resend.com`
   - Port: `465`
   - Username: `resend`
   - Password: *(the API key)*
   - Sender email: `academy@skykapital.com`
   - Sender name: `Skykapital Academy`

*Alternative if you prefer using your Microsoft 365 mailbox:* host
`smtp.office365.com`, port `587`, username/password of a real mailbox
(e.g. `academy@skykapital.com`), SMTP AUTH must be enabled by your M365
admin. Resend is simpler and keeps your mailbox out of it.

After enabling custom SMTP, raise the rate limit: **Authentication → Rate
Limits → Email sent** (e.g. 100/hour).

---

## 2. Branded email template

Supabase dashboard → **Authentication → Email Templates → Reset Password**.

Subject:

```
Your Skykapital Academy access — set your password
```

Body (paste as HTML):

```html
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6f9;padding:32px 0;font-family:Arial,Helvetica,sans-serif;">
  <tr><td align="center">
    <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e3e7ee;">
      <tr>
        <td style="background:#0d1c32;padding:22px 32px;border-bottom:3px solid #c99a2e;">
          <span style="color:#ffffff;font-size:16px;font-weight:bold;letter-spacing:4px;">&#10022; SKYKAPITAL ACADEMY</span>
        </td>
      </tr>
      <tr>
        <td style="padding:32px;">
          <h2 style="margin:0 0 12px;color:#0d1c32;font-size:20px;">Welcome to your ESG training</h2>
          <p style="margin:0 0 20px;color:#444c58;font-size:14px;line-height:1.6;">
            An account has been created for you on the Skykapital Academy
            learning platform. Click the button below to choose your password
            and start your first module.
          </p>
          <p style="text-align:center;margin:28px 0;">
            <a href="{{ .ConfirmationURL }}"
               style="background:#0d1c32;color:#ffffff;text-decoration:none;padding:14px 32px;border-radius:8px;font-size:14px;font-weight:bold;display:inline-block;">
              Set my password
            </a>
          </p>
          <p style="margin:0;color:#8a93a1;font-size:12px;line-height:1.6;">
            This link is personal and expires after a short time. If you did
            not expect this email, you can safely ignore it.
          </p>
        </td>
      </tr>
      <tr>
        <td style="background:#f7f8fa;padding:16px 32px;border-top:1px solid #e3e7ee;">
          <span style="color:#8a93a1;font-size:11px;">Skykapital Europe &bull; ESG Foundation Series</span>
        </td>
      </tr>
    </table>
  </td></tr>
</table>
```

Keep `{{ .ConfirmationURL }}` exactly as written — Supabase replaces it with
the personal link.

---

## 3. Checklist (once per client platform)

- [ ] Custom SMTP enabled (sender `academy@skykapital.com`)
- [ ] Email rate limit raised
- [ ] Reset Password template replaced with the HTML above
- [ ] **Authentication → URL Configuration**: Site URL = the platform URL,
      and `https://<platform-url>/reset` listed in Redirect URLs
- [ ] Test: create a dummy account with your own email, receive the email,
      set a password, sign in
