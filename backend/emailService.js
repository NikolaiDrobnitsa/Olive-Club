const dotenv = require('dotenv');
const nodemailer = require('nodemailer');


dotenv.config();

const emailService = async(email, code) => {
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: Number(process.env.EMAIL_PORT),
        secure: true,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASS,
        }
    })

    const mailOptions = {
        from: `"Family Olive Club" <${process.env.EMAIL}>`,
        to: email,
        subject: 'Confirm registration',
        text: `You code: ${code}`,
        html: `<p>Ваш код подтверждения: ${code}</p>`,
    }

    await transporter.sendMail(mailOptions);
}

module.exports = emailService;