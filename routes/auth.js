const express = require("express");
const bcrypt = require("bcryptjs");
const { body } = require("express-validator");

const User = require("../Model/user");
const authController = require("../controllers/auth");
const validate = require("../util/validate");

const router = express.Router();

router.post(
  "/signUp",
  [
    body("username").trim().notEmpty(),
    validate.email().custom(async (value, { req }) => {
      const user = await User.findUser(value);
      if (user[0].length) {
        throw new Error("Email aleady in use!");
      }
    }),
    validate.passwor(),
  ],
  authController.postSignUp
);

router.post(
  "/login",
  [
    validate.email().custom(async (value, { req }) => {
      const user = await User.findUser(value);
      console.log(user);
      if (user[0].length <= 0) {
        throw new Error("Email does not exists");
      }
    }),
    validate.passwor().custom(async (value, { req }) => {
      const email = req.body.email;
      const user = await User.findUser(email);
      const hasPassword = user[0][0].password;
      const isValid = await bcrypt.compare(value, hasPassword);
      if (!isValid) {
        throw new Error("password does not match");
      }
    }),
  ],
  authController.postLogin
);

module.exports = router;
