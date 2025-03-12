const { body } = require("express-validator");

exports.passwor = () =>
  body("password")
    .trim()
    .notEmpty()
    .isLength({ min: 5, max: 10 })
    .withMessage("password needed to be between 5 and 10");

exports.email = () =>
  body("email")
    .trim()
    .notEmpty()
    .isEmail()
    .withMessage("please insert valid email")
    .normalizeEmail();

