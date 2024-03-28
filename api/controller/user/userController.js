const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const userModel = require("../../model/userModel");
const { verifyLoginMail } = require("../additional/emailVerifier");

// Sign Up/Register User
const registerUser = async (req, res, next) => {
  try {
    const { name, email, mobile, image, password } = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ error: "Name, email, and password are required fields." });
    }

    // Password Complexity Check
    const passwordRegex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        error:
          "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
      });
    }

    // console.log("body:", password);
    const salt = await bcrypt.genSalt(10);
    // console.log(salt);
    bcrypt.hash(password, salt, async (err, encryptedPassword) => {
      if (err) {
        // console.log(`Error To Encrypt Password ${err}`);
        res.status(501).json({
          message: "Error To Encrypt Password",
          error: err,
        });
      }
      if (encryptedPassword) {
        // console.log(`Encrypted Password ${encryptedPassword}`);

        const newUser = new userModel({
          name,
          email,
          mobile,
          image,
          password: encryptedPassword,
          is_admin: 0,
          is_verified: 0,
        });

        const userAlreadyExist = await userModel.findOne({
          email: req.body.email,
        });

        if (userAlreadyExist && userAlreadyExist.is_verified === 1) {
          res.status(400).json({
            message: "User Already Registered and Verified",
          });
        } else if (userAlreadyExist && userAlreadyExist.is_verified === 0) {
          // send mail
          verifyLoginMail(req.body.name, req.body.email, userAlreadyExist._id);

          res.status(400).json({
            message: "User Already Registered and not Verified",
          });
        } else {
          newUser
            .save()
            .then((data) => {
              console.log("User Registered");
              verifyLoginMail(req.body.name, req.body.email, data._id);
              res.status(201).json({
                message: "User Registered",
                name: req.body.name,
              });
            })
            .catch((err) => {
              console.log(err);
              res.status(500).json({
                message: "Something went wrong when saving user",
              });
            });
        }
      }
    });
  } catch (err) {
    res.status(501).json({
      error: "Internal server error when registering user",
    });
    console.log(err.message);
  }
};

module.exports = {
  registerUser,
};
