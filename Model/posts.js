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

  update(id) {
    if (!this.productURL)
      return db.execute(
        `UPDATE posts SET content ='${this.content}' , title = '${this.title}' WHERE id = ${id} && user_id = ${this.user_id} `
      );
    else
      return db.execute(
        `UPDATE posts SET content ='${this.content}' , productURL = '${this.productURL.path}', title = '${this.title}' WHERE id = ${id} && user_id = ${this.user_id} `
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
  static fetchUserData(id) {
    return db.execute("SELECT * FROM posts WHERE user_id = " + id);
  }
};
