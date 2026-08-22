import nodemailer from 'nodemailer';

export const sendEmail = async ({ to, subject, text }) => {
  if (!process.env.SMTP_HOST) {
    console.log('\n--- EMAIL NOTIFICATION MOCK ---');
    console.log(`To: ${to}\nSubject: ${subject}\nText:\n${text}`);
    console.log('-------------------------------\n');
    return;
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.SMTP_FROM || '"HRMS Notifications" <noreply@hrms.com>',
    to,
    subject,
    text,
  });
};
