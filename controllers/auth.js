const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

const User = require("../Model/user");

exports.postSignUp = async (req, res, next) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const imageUrl = req.file ? req.file.path : "unknoun";
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array(),
    });
  }
  try {
    const hashPassword = await bcrypt.hash(password, 12);
    const newUser = new User(username, email, hashPassword, imageUrl);
    const result = await newUser.save();

    if (result) {
      res.status(201).json({
        msg: "User created succssfuly",
        user: newUser,
      });
    }
  } catch (error) {
    next({
      msg: error.message,
      statusCode: error.statusCode,
    });
  }
};

exports.postLogin = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array(),
    });
  }

  try {
    const user = await User.findUser(email);
    if (!user[0].length) {
      const err = new Error("Email not exists!!!");
      err.statusCode = 422;
      throw err;
    }
    console.log("valid user");
    const hasPassword = user[0][0].password;
    const isValid = await bcrypt.compare(password, hasPassword);
    if (!isValid) {
      const err = new Error("password is not corrrect!!");
      err.statusCode = 422;
      throw err;
    }
    const token = jwt.sign({ ...user[0][0] }, "mysecretkeyformyrpoject", {
      expiresIn: "1hr",
    });
    res.status(200).json({
      token,
      msg: "welcom back to account ",
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
