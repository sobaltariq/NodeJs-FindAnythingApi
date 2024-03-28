const express = require("express");
const multer = require("multer");
const path = require("path");
const { registerUser } = require("../controller/user/userController");

const router = express.Router();

router.post("/register", registerUser);

// router.get("/verify", verifyMail);

// router.post("/login", loginUser);

// router.get("/logout", authCheckerLogout, logoutUser);

// router.post("/verify-password", verifyPasswordUser);
// router.post("/change-password", changePasswordUser);

// router.get("/home", authChecker, homeUser);

// router.put(
//   "/edit-profile/:id",
//   upload.single("image"),
//   authChecker,
//   editProfileUser
// );

module.exports = router;
