import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || "465"),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export async function sendInviteEmail(email: string, token: string) {
  const inviteLink = `${APP_URL}/admin/reset-password?token=${token}`;

  const mailOptions = {
    from: `"Pemira Himasta" <${process.env.SMTP_USER}>`,
    to: email,
    subject: "Undangan Admin Pemira Himasta",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 8px;">
        <h2 style="color: #333; text-align: center;">Selamat Datang di Pemira Himasta</h2>
        <p style="color: #555; font-size: 16px;">
          Anda telah diundang untuk menjadi Admin di sistem Pemira Himasta. Untuk mulai menggunakan akun Anda, silakan atur password Anda dengan mengklik tombol di bawah ini:
        </p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${inviteLink}" style="background-color: #000; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 16px;">
            Atur Password
          </a>
        </div>
        <p style="color: #777; font-size: 14px; text-align: center;">
          Tautan ini akan kedaluwarsa dalam 24 jam.<br />
          Jika Anda tidak merasa menerima undangan ini, abaikan email ini.
        </p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error("Gagal mengirim email undangan:", error);
    return { success: false, error: "Gagal mengirim email." };
  }
}

export async function sendResetPasswordEmail(email: string, token: string) {
  const resetLink = `${APP_URL}/admin/reset-password?token=${token}`;

  const mailOptions = {
    from: `"Pemira Himasta" <${process.env.SMTP_USER}>`,
    to: email,
    subject: "Reset Password Admin Pemira Himasta",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 8px;">
        <h2 style="color: #333; text-align: center;">Permintaan Reset Password</h2>
        <p style="color: #555; font-size: 16px;">
          Kami menerima permintaan untuk mereset password akun Admin Pemira Himasta Anda. Jika Anda yang meminta ini, silakan klik tombol di bawah ini:
        </p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetLink}" style="background-color: #000; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 16px;">
            Reset Password
          </a>
        </div>
        <p style="color: #777; font-size: 14px; text-align: center;">
          Tautan ini hanya berlaku selama 1 jam.<br />
          Jika Anda tidak meminta reset password, Anda dapat mengabaikan email ini dengan aman.
        </p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error("Gagal mengirim email reset password:", error);
    return { success: false, error: "Gagal mengirim email." };
  }
}
