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
  await transporter.sendMail({
    to: email,
    subject: 'Your verification code',
    html: `<p>Your verification code is: <b>${code}</b></p>`,
  });
};