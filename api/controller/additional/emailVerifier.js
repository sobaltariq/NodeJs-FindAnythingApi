const nodemailer = require("nodemailer");

// for env
require("dotenv").config();

const verifyLoginMail = (name, email, id, res) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MY_EMail,
        pass: process.env.MY_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const mailOptions = {
      form: process.env.MY_EMail,
      to: email,
      subject: "Verify Your Email Find Anything",
      // this url with ? symbol will work only with req.query.id it won't work with param
      html: `<p>Hello ${name}, please click <a href="${process.env.MY_URL}/user/verify?id=${id}">here</a> to verify your email.</p> </br> <p>Find Anything</p>`,
    };
    transporter
      .sendMail(mailOptions)
      .then((info) => {
        console.log("Mail", info.response);
      })
      .catch((err) => {
        console.error("Email sending error:", err);
      });
  } catch (err) {
    console.log("EMail Error:", err);
  }
};

const verifyPasswordMail = (name, email, token, res) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MY_EMail,
        pass: process.env.MY_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const mailOptions = {
      form: process.env.MY_EMail,
      to: email,
      subject: "Reset Password",
      // this url with ? symbol will work only with req.query.id it won't work with param
      html: `<p>Hello ${name}, your verification code for resetting the password is ${token}</p>`,
    };
    transporter
      .sendMail(mailOptions)
      .then((info) => {
        console.log("Mail", info.response);
      })
      .catch((err) => {
        console.error("Email sending error:", err);
      });
  } catch (err) {
    console.log("EMail:", err);
  }
};

module.exports = {
  verifyLoginMail,
  verifyPasswordMail,
};
