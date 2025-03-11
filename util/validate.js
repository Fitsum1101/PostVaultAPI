const { body } = require("express-validator");

exports.passworValidate = () =>
  body("password")
    .trim()
    .notEmpty()
    .isLength({ min: 5, max: 10 })
    .withMessage("password needed to be between 5 and 10");

exports.emailValidate = () =>
  body("email")
    .trim()
    .notEmpty()
    .isEmail()
    .withMessage("please insert valid email")
    .normalizeEmail();
