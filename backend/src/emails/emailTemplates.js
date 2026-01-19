export function createWelcomeEmailTemplate(name, clientURL) {
  return `
   <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Email</title>
</head>
<body style="margin:0; padding:0; background:#0b0f1a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" style="background:#0b0f1a; padding:60px 0;">
  <tr>
    <td align="center">

      <!-- Main Card -->
      <table width="600" cellpadding="0" cellspacing="0" style="background:#111827; border-radius:14px; overflow:hidden; box-shadow:0 20px 60px rgba(0,0,0,0.6);">

        <!-- Header -->
        <tr>
          <td align="center" style="padding:40px 30px 20px;">
            <img
              src="https://your-cdn.com/logo-or-avatar.png"
              width="88"
              height="88"
              alt="YourApp"
              style="border-radius:50%; border:3px solid #1f2937;"
            />
            <h1 style="color:#ffffff; font-size:22px; margin:20px 0 5px; font-weight:600;">
              YourApp
            </h1>
            <p style="color:#9ca3af; font-size:14px; margin:0;">
              Secure Web Platform
            </p>
          </td>
        </tr>

        <!-- Divider -->
        <tr>
          <td style="padding:0 40px;">
            <hr style="border:none; border-top:1px solid #1f2937;">
          </td>
        </tr>

        <!-- Content -->
        <tr>
          <td style="padding:30px 40px; color:#d1d5db; font-size:15px; line-height:1.8;">
            <p style="margin-top:0;">Hello, ${name} </p>

            <p>
              Welcome to <strong style="color:#ffffff;">YourApp</strong>.  
              Your account has been successfully created and is now ready to use.
            </p>

            <p>
              We focus on security, performance, and a clean experience for our users.
            </p>

            <!-- Button -->
            <div style="text-align:center; margin:35px 0;">
              <a href="${clientURL}"
                 style="background:#2563eb; color:#ffffff; text-decoration:none; padding:14px 36px; border-radius:10px; font-size:15px; font-weight:600; display:inline-block;">
                Open Chat Application
              </a>
            </div>

            <p style="font-size:13px; color:#9ca3af;">
              If you did not request this email, please ignore it.
            </p>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td align="center" style="background:#0b1220; padding:20px; font-size:12px; color:#6b7280;">
            © 2026 YourApp. All rights reserved<br/>
            <span style="color:#4b5563;">noreply@yourapp.com</span>
          </td>
        </tr>

      </table>

    </td>
  </tr>
</table>

</body>
</html>

 `;
}
