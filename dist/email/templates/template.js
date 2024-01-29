/*******************************************************************************
 * Copyright (c) iamsouravganguli 2023.
 * @author Sourav Ganguli <mysganguli@gmail.com>
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
 ******************************************************************************/
import { EmailConfig } from '../config/email.config.js';
import { CheckUserHelper } from '../../helper/check_user/check.user.helper.js';
export class Template {
    static sendEmail = async (data) => {
        return await EmailConfig.init.sendMail({
            from: '"no-reply" <admin@tgiscaleme.com>', // sender address
            to: data?.to,
            subject: data?.subject,
            text: data?.text,
            html: data?.html,
        });
    };
    static forgotPassword = async (props) => {
        try {
            const res = await this.sendEmail({
                to: props?.to,
                subject: 'TG Scale Me Password Reset',
                html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
            margin: 20px;
            padding: 20px;
            background-color: #f8f8f8;
            text-align: center;
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
    <p>Hi there,</p>
    <p>To reset your password, click the link below:</p>
    <p><a href="http://localhost:4000/${props?.passwordSessionURL}">Reset Your Password</a></p>
    <p>If you didn't request this, you can safely ignore this email.</p>
    <p>Thanks,<br>
    TG Scale Me</p>
</body>
</html>`,
            });
            if (res.response.substring(0, 3) === '250') {
                return Promise.resolve(true);
            }
        }
        catch (e) {
            return Promise.reject(e);
        }
    };
    static resetDone = async (props) => {
        try {
            const res = await this.sendEmail({
                to: props?.to,
                subject: 'TG Scale Me Password Reset Successful',
                html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset Successful</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
            margin: 20px;
            padding: 20px;
            background-color: #f8f8f8;
            text-align: center;
        }

        p {
            margin-bottom: 15px;
        }
    </style>
</head>
<body>
    <p>Hi ${props?.username},</p>
    <p>Your password has been successfully reset. You can now log in using your new password.</p>
    <p>If you have any questions or concerns, please don't hesitate to contact us.</p>
    <p>Thanks,<br>
    TG Scale Me</p>
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
    };
    static setNewPassword = async (props) => {
        try {
            const res = await this.sendEmail({
                to: props?.to,
                subject: 'TG Scale Me Set a New Password',
                html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Set New Password</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
            margin: 20px;
            padding: 20px;
            background-color: #f8f8f8;
            text-align: center;
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
    <p>Hi ${props?.username},</p>
    <p>You've requested to set a new password. Click the link below to proceed:</p>
    <p><a href="http://localhost:4000/${props?.passwordSessionURL}">Set New Password</a></p>
    <p>If you didn't make this request, you can ignore this email.</p>
    <p>Thanks,<br>
    TG Scale Me</p>
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
    };
    static accountCreatedSuccessful = async (props) => {
        try {
            const details = await CheckUserHelper.bothUserDetailsCredentials(props?.userId);
            const res = await this.sendEmail({
                to: process.env.TESTEMAIL || details?.userEmail?.email,
                subject: ' 🎉Congratulations! Your Account Has Been Created Successfully ',
                html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <style>
        body {
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
            margin: 20px;
            padding: 20px;
            background-color: #f8f8f8;
            text-align: center;
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
    ${Array.from({ length: 4 })
                    .map((_, index) => `<h2>Welcome to TG Scale Me!</h2>`)
                    .join('')}
    <p>Congratulations ${details?.userInfo?.personalDetails
                    ?.firstName}, your account has been created successfully.</p>
    <p>To activate your account, please click on the following link:</p>
    <p><a href="[Activation Li]">Activate Your Account</a></p>
    <p>If you have any questions or need assistance, feel free to contact us.</p>
    <p>Thanks,<br>
    TG Scale Me</p>
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
    };
    static userPasswordSuccessfully = async (props) => {
        try {
            const details = await CheckUserHelper.bothUserDetailsCredentials(props?.userId);
            const res = await this.sendEmail({
                to: 'mysganguli@gmail.com',
                subject: 'Password Set Successfully',
                html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Set Successfully</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
            margin: 20px;
            padding: 20px;
            background-color: #f8f8f8;
            text-align: center;
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
    <p>Hi ${details?.userInfo?.personalDetails?.firstName},</p>
    <p>Your password has been set successfully.</p>
    <p>If you have any questions or need further assistance, please don't hesitate to contact us.</p>
    <p>Thanks,<br>
    TG Scale Me</p>
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
    };
}
