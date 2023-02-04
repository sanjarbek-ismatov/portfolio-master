const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { User } = require("../models/Model");
module.exports = {
  sendMail: (email, url) => {
    var status;
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.AUTH_EMAIL,
        pass: process.env.AUTH_PASSWORD,
      },
    });
    const mailOptions = {
      from: '"Portfolio Master" <ismatovvsanjarbek@gmail.com>',
      to: email,
      subject: "Emailni tasdiqlash",
      html: `
        <h1 align="center">Salom, Foydalanuvchi!</h1>
        <p align="center">Portfolio Masterga ro'yhatdan o'tayotganingiz uchun rahmat! Davom ettirish uchun tasdiqlashni bosing:  
        <a href="${url}" align="center" style="font-family: sans-serif;">Tasdiqlash</a>
        </p>
          `,
    };
    transporter.sendMail(mailOptions, (err, info) => (status = err));
    return status;
  },
  generateToken: (email) => jwt.sign({ email }, process.env.SECRET),
  verifyToken: (email, token) => {
    try {
      const { email: decodedEmail } = jwt.verify(token, process.env.SECRET);
      if (decodedEmail !== email) return;
      return true;
    } catch (ex) {
      return;
    }
  },
  url: () => process.env.CLIENT_URL || "http://localhost:3000",
};
