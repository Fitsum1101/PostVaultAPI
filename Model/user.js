const db = require("../config/db");

module.exports = class User {
  constructor(username, email, password, imageUrl) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.imageUrl = imageUrl;
  }
  save() {
    return db.execute(
      "INSERT INTO users(username,email,password,imageUrl) VALUES(?,?,?,?)",
      [this.username, this.email, this.password, this.imageUrl]
    );
  }
  static findUser(email) {
    return db.execute(`SELECT * FROM users WHERE email ='${email}'`);
  }
};
