const nodemailer = require("nodemailer");
module.exports = {
  sendMail: (email, name, code) => {
    var status;
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "ismatovvsanjarbek@gmail.com",
        pass: "sliznykcxxizrcvw",
      },
    });
    const mailOptions = {
      from: '"Portfolio Master" <ismatovvsanjarbek@gmail.com>',
      to: email,
      subject: "Emailni tasdiqlash",
      text: `Salom, ${name}! Portfolio Masterga ro'yhatdan o'tganingiz uchun rahmat! Sizning tasdiqlash kodingiz: ${code}
          `,
      html: `
        <h1 align="center">Salom, ${name}!</h1>
        <p align="center">Portfolio Masterga ro'yhatdan o'tganingiz uchun rahmat! <br> Sizning tasdiqlash kodingiz: </p>
        <hr>
        <h2 align="center">${code}</h2>
          `,
    };
    transporter.sendMail(mailOptions, (err, info) => (status = err));
    return status;
  },
  randomCode: () => {
    return Math.floor(Math.random() * 1000000);
  },
};
