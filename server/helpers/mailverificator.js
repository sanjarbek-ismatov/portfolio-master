const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
module.exports = {
  /**
   * @description This function sends email to user
   * @param {string} email - user email
   * @param {string} url - url for verification
   * @returns {string} status
   */
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
      from: '"Portfolio Master" <portfoliomasteruz@gmail.com>',
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
  /**
   * @description This function generates token
   * @param {string} email - user email
   * @returns {string} token
   */
  generateToken: (email) => jwt.sign({ email }, process.env.SECRET),
  /**
   * @description This function verifies token
   * @param {string} email - user email
   * @param {string} token - token for verification
   * @returns {boolean}
   */
  verifyToken: (email, token) => {
    try {
      const { email: decodedEmail } = jwt.verify(token, process.env.SECRET);
      if (decodedEmail !== email) return;
      return true;
    } catch (ex) {
      return;
    }
  },
  /**
   * @description This function returns url
   * @returns {string} url
   */
  url: () => process.env.CLIENT_URL || "http://localhost:3000",
};
