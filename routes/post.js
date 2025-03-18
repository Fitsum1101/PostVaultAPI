const express = require("express");
const { ExpressValidator } = require("express-validator");

const postControlles = require("../controllers/post");
const is_auth = require("../util/is-auth");

const router = express.Router();

const { body } = new ExpressValidator({
  isValidContent: (value) => {
    if (value.length > 6) {
      throw new Error("new functionality implemented");
    }
  },
});

router.post(
  "/posts",
  is_auth,
  [body("content").trim().notEmpty().isValidContent()],
  postControlles.createPosts
);

router.get("/posts", postControlles.getPosts);

router.get("/posts/myposts", is_auth, postControlles.getUserPosts);

router.delete("/posts/delete", is_auth, postControlles.deletePost);

router.get("/posts/update/:postId", postControlles.getUpdatePost);

router.put("/posts/update/:postId", is_auth, postControlles.putPost);

module.exports = router;
