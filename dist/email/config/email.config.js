import nodemailer from 'nodemailer';
export class EmailConfig {
    static init = nodemailer.createTransport({
        host: process.env.SMTPURL,
        port: 465,
        secure: true,
        auth: {
            user: process.env.SMTPUSERNAME,
            pass: process.env.SMTPPASSWORD,
        },
        priority: 'high',
    });
}
