const db = require("../config/db");

module.exports = class User {
  constructor(username, email, password) {
    this.username = username;
    this.email = email;
    this.password = password;
  }
  save() {
    return db.execute(
      "INSERT INTO user VALUES(username,email,password) VALUES(?,?,?)",
      [this.username, this.email, this.password]
    );
  }
  static findUser(email) {
    return db.execute("SELECT * FROM users WHERE email = " + email);
  }
};
