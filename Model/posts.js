const db = require("../config/db");

module.exports = class Posts {
  constructor(content, user_id) {
    this.content = content;
    this.user_id = user_id;
  }
  save() {
    return db.execute("INSERT INTO posts(content,user_id) VALUES(?,?) ", [
      this.content,
      this.user_id,
    ]);
  }
  static fetchAll() {
    return db.execute("SELECT * FROM posts");
  }
  static deletePost(user_id, post_id) {
    return db.execute(
      `DELETE FROM posts WHERE user_id = ${user_id} && id = ${post_id} `
    );
  }
};
