const express = require("express");
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
      if (user[0].length > 0) {
        throw new Error("Email aleady in use!");
      }
    }),
    validate.passwor(),
  ],
  authController.postSignUp
);

router.post(
  "/login",
  [validate.email(), validate.passwor()],
  authController.postLogin
);

module.exports = router;
