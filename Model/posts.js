const db = require("../config/db");

module.exports = class Posts {
  constructor(content, user_id, productURL, title) {
    this.content = content;
    this.user_id = user_id;
    this.productURL = productURL;
    this.title = title;
  }
  save() {
    return db.execute(
      "INSERT INTO posts(content,user_id,productURL,title) VALUES(?,?,?,?) ",
      [this.content, this.user_id, this.productURL, this.title]
    );
  }
  static fetchAll() {
    return db.execute("SELECT content,title FROM posts");
  }
  static fetchById(productId) {
    return db.execute("SELECT * FROM posts WHERE id = " + productId);
  }
  static deletePost(user_id, post_id) {
    return db.execute(
      `DELETE FROM posts WHERE user_id = ${user_id} && id = ${post_id} `
    );
  }
};
