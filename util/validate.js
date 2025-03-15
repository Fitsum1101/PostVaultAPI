const { body } = require("express-validator");

exports.passwor = () =>
  body("password", "password is Empty!!")
    .trim()
    .notEmpty()
    .isLength({ min: 5, max: 10 })
    .withMessage("password needed to be between 5 and 10");

exports.email = () =>
  body("email", "Email is Empty")
    .trim()
    .notEmpty()
    .isEmail()
    .withMessage("please insert valid email")
    .normalizeEmail();
