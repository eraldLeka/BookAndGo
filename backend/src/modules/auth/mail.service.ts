import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT),
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  async sendVerificationEmail(email: string, fullName: string, token: string) {
    const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;

    await this.transporter.sendMail({
      from: process.env.MAIL_FROM,
      to: email,
      subject: 'BookAndGo — Verifiko Email-in Tënd',
      html: `
        <h2>Mirë se vini në BookAndGo, ${fullName}!</h2>
        <p>Kliko linkun më poshtë për të verifikuar email-in tënd:</p>
        <a href="${verificationUrl}" style="
          background: #4F46E5;
          color: white;
          padding: 12px 24px;
          border-radius: 6px;
          text-decoration: none;
          display: inline-block;
          margin: 16px 0;
        ">Verifiko Email-in</a>
        <p>Linku skadon pas 24 orësh.</p>
        <p>Nëse nuk e krijuat këtë llogari, injoroni këtë email.</p>
        <br/>
        <small>BookAndGo Team</small>
      `,
    });
  }
}