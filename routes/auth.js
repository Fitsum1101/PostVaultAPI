const express = require("express");
const { body } = require("express-validator");
const bcrypt = require("bcryptjs");

const User = require("../Model/user");
const authController = require("../controllers/auth");

const router = express.Router();

router.post(
  "/signUp",
  [
    body("username").trim().notEmpty(),
    body("email", "please insert email field")
      .trim()
      .notEmpty()
      .isEmail()
      .withMessage("please insert valid email")
      .normalizeEmail()
      .custom(async (value, { req }) => {
        const user = await User.findUser(value);
        if (user[0].length > 0) {
          throw new Error("Email aleady in use!");
        }
      }),
    body("password", "password field in Empty please insert something")
      .trim()
      .notEmpty()
      .isLength({ min: 5, max: 10 })
      .withMessage("password needed to be between 5 and 10"),
  ],
  authController.postSignUp
);

router.post(
  "/login",
  [
    body("email", "please insert email field")
      .trim()
      .notEmpty()
      .isEmail()
      .withMessage("please insert valid email")
      .normalizeEmail()
      .custom(async (value, { req }) => {
        const user = await User.findUser(value);
        if (user[0].length) {
          throw new Error("Email does not Exsits");
        }
      }),
    body("password")
      .trim()
      .notEmpty()
      .isLength({ min: 5, max: 10 })
      .withMessage("password needed to be between 5 and 10"),
  ],
  authController.postLogin
);

module.exports = router;
