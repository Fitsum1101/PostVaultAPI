const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../Model/user");

exports.postSignUp = async (req, res, next) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  try {
    const myuser = await User.findUser(email);
    if (myuser[0].length > 0) {
      const err = new Error("user already exists");
      err.statusCode = 422;
      throw err;
    }
    const hashPassword = await bcrypt.hash(password, 12);
    const newUser = new User(username, email, hashPassword);
    const result = await newUser.save();
    if (result) {
      res.statusCode(201).json({
        msg: "User created succssfuly",
      });
    }
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    throw error;
  }
};

exports.postLogin = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    const user = await User.findUser(email);
    if (!user[0].length) {
      const err = new Error("Email not exists!!!");
      err.statusCode = 422;
      throw err;
    }
    const hasPassword = user[0][0].password;
    const isValid = await bcrypt.compare(password, hasPassword);
    if (!isValid) {
      const err = new Error("password is not corrrect!!");
      err.statusCode = 422;
      throw err;
    }
    const token = jwt.sign(
      { username: user[0][0].username, email },
      "mysecretkeyformyrpoject",
      { expiresIn: "1hr" }
    );
    res.statusCode(200).json({
      token,
      msg: "welcom back to account ",
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    throw error;
  }
};
