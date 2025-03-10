const express = require("express");

const postControlles = require("../controllers/post");
const is_auth = require("../util/is-auth");

const router = express.Router();

router.post("/posts", is_auth, postControlles.createPosts);

router.get("/posts", is_auth, postControlles.getPosts);

router.post("/posts/delete/:postId", is_auth, postControlles.deletePost);

module.exports = router;
