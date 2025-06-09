import nodemailer from 'nodemailer';
import config from '../config/config';
export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: config.email_admin_sender,
    pass: config.email_admin_password,
  },
});

export const sendVerificationCode = async (email: string, code: string) => {
  
  let client_url = `${process.env.CLIENT_URL}/verify-email?code=${code}`;
  const html = htmlTemplate
  .replace("{{VERIFICATION_CODE}}", code)
  .replace("{{VERIFICATION_LINK}}", client_url);
  await transporter.sendMail({
    to: email,
    subject: 'Your verification code',
    html
  });
};
const htmlTemplate = `

<!doctype html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Email Verification</title>
  </head>
  <body
    style="
      font-family: Arial, sans-serif;
      background-color: #f5f5f5;
      padding: 20px;
    "
  >
    <table width="100%" cellspacing="0" cellpadding="0">
      <tr>
        <td align="center">
          <table
            width="600"
            style="
              background-color: #ffffff;
              padding: 40px;
              border-radius: 10px;
            "
          >
            <tr>
              <td align="center" style="padding-bottom: 20px">
                <h2 style="color: #333333">Verify Your Email</h2>
              </td>
            </tr>

            <tr>
              <td align="center" style="padding-bottom: 20px">
                <p style="font-size: 16px; color: #666666">
                  Use the code below to verify your email:
                </p>
                <div
                  style="
                    font-size: 28px;
                    font-weight: bold;
                    color: #000000;
                    margin-top: 10px;
                  "
                >
                  {{VERIFICATION_CODE}}
                </div>
              </td>
            </tr>

            <tr>
              <td align="center" style="padding-top: 30px">
                <p style="font-size: 16px; color: #666666">
                  Or click the button below to verify instantly:
                </p>
                <a
                  href="{{VERIFICATION_LINK}}"
                  style="
                    display: inline-block;
                    padding: 12px 24px;
                    background-color: #007bff;
                    color: white;
                    text-decoration: none;
                    font-size: 16px;
                    border-radius: 5px;
                    margin-top: 10px;
                  "
                >
                  Verify Email
                </a>
              </td>
            </tr>

            <tr>
              <td
                align="center"
                style="padding-top: 40px; font-size: 12px; color: #999999"
              >
                If you did not request this, you can ignore this email.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>

`;
const htmlTemplateResetPassword = `
<!doctype html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Reset Password</title>
  </head>
  <body
    style="
      font-family: Arial, sans-serif;
      background-color: #f5f5f5;
      padding: 20px;
    "
  >
    <table width="100%" cellspacing="0" cellpadding="0">
      <tr>
        <td align="center">
          <table
            width="600"
            style="
              background-color: #ffffff;
              padding: 40px;
              border-radius: 10px;
            "
          >
            <tr>
              <td align="center" style="padding-bottom: 20px">
                <h2 style="color: #333333">Reset Your Password</h2>
              </td>
            </tr>


            <tr>
              <td align="center" style="padding-top: 30px">
                <p style="font-size: 16px; color: #666666">
                   click the button below to Reset Password ! :
                </p>
                <a
                  href="{{VERIFICATION_LINK}}"
                  style="
                    display: inline-block;
                    padding: 12px 24px;
                    background-color: #007bff;
                    color: white;
                    text-decoration: none;
                    font-size: 16px;
                    border-radius: 5px;
                    margin-top: 10px;
                  "
                >
                  Reset Your Email Password
                </a>
              </td>
            </tr>

            <tr>
              <td
                align="center"
                style="padding-top: 40px; font-size: 12px; color: #999999"
              >
                If you did not request this, you can ignore this email.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`

export const sendResetPasswordLink = async (email: string, code: string) => {

  let client_url = `${process.env.CLIENT_URL}/reset-password?code=${code}&email=${email}`;
  const html = htmlTemplateResetPassword
  .replace("{{VERIFICATION_LINK}}", client_url);
  await transporter.sendMail({
    to: email,
    subject: 'Reset Your Password',
    html
  });
}