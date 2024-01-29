import { Nodemailer } from '../../../vendor/index.js';
export var DynamicTemplates;
(function (DynamicTemplates) {
    DynamicTemplates.Authentication = {
        forgotPassword: async (option) => {
            try {
                const res = await Nodemailer.sendMail({
                    to: option?.email,
                    from: '"no-reply" <admin@tgiscaleme.com>',
                    subject: ' 🎉Password Reset Link ',
                    html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta content="width=device-width, initial-scale=1.0" name="viewport">
    <title>Password Reset</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
            margin: 20px;
            padding: 20px;
            background-color: #f8f8f8;
        }

        h2 {
            color: #007BFF;
        }

        p {
            margin-bottom: 15px;
        }

        a {
            color: #007BFF;
            text-decoration: none;
            font-weight: bold;
        }
    </style>
</head>
<body>
<h2>Password Reset Request</h2>

<p>Dear [User's Name],</p>

<p>We received a request to reset your password. If you did not make this request, please ignore this email. Otherwise, click on the link below to reset your password:</p>

<p><a href="${option.sessionLink}">Reset Your Password</a></p>

<p>This link is valid for the next [expiration time, e.g., 24 hours].</p>

<p>If you have any issues or need further assistance, please contact our support team at [Your Support Email] or [Your Support Phone Number].</p>

<p>Thank you!</p>

<p>Best regards,<br>
    [Your Full Name]<br>
    [Your Position]<br>
    [Your Company Name]</p>
</body>
</html>
`,
                });
                if (res.response.substring(0, 3) === '250') {
                    return Promise.resolve(true);
                }
            }
            catch (e) {
                return Promise.reject(e);
            }
        },
    };
    const AccountCreated = {
        success: async (options) => { },
        fail: async (options) => { },
    };
})(DynamicTemplates || (DynamicTemplates = {}));
