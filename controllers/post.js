const { validationResult } = require("express-validator");

const Post = require("../Model/posts");
const deleteFile = require("../util/file");
const socket = require("../socket");

exports.createPosts = async (req, res, next) => {
  const result = validationResult(req);
  const content = req.body.content;
  const title = req.body.title;
  const user = req.user.id;
  const productUrl = req.file.path;

  const newPost = new Post(content, user, productUrl, title);
  try {
    const result = await newPost.save();
    socket.emit("posts", { action: "added", post: newPost });
    res.status(201).json({
      msg: "new posts adde to user",
      post: {
        content,
        title,
      },
    });
  } catch (error) {
    error.statusCode = 500;
    next(error);
  }
};

exports.getPosts = async (req, res, next) => {
  // const user = req.user.id;
  //   pagenation in needed
  try {
    const allPosts = await Post.fetchAll();
    res.status(200).json({
      msg: "status code accepted",
      posts: allPosts[0],
    });
  } catch (error) {
    error.statusCode = 500;
    next(error);
  }
};

exports.getUserPosts = async (req, res, next) => {
  const user_id = req.user.id;
  try {
    const userPosts = await Post.fetchUserData(user_id);
    res.status(200).json({
      msg: "user data fecthed",
      posts: userPosts[0],
    });
  } catch (error) {
    error.statusCode = 500;
    next(error);
  }
};

exports.deletePost = async (req, res, next) => {
  const user_id = req.user.id;
  const post_id = req.body.postId;
  try {
    const post = await Post.fetchById(post_id);
    const deletePath = post[0][0].productURL;
    const result = await Post.deletePost(user_id, post_id);
    deleteFile(deletePath);
    res.status(200).json({
      msg: "deleted succssfuly",
      result,
    });
  } catch (error) {
    next(error);
  }
};

exports.getUpdatePost = async (req, res, next) => {
  try {
    const postId = req.params.postId;
    const post = await Post.fetchById(postId);
    return res.status(200).json({
      post: post[0][0],
    });
  } catch (error) {
    next(error);
  }
};

exports.putPost = async (req, res, next) => {
  const postId = req.params.postId;
  const content = req.body.content;
  const title = req.body.title;
  const user = req.user.id;
  const productUrl = req.file;
  const updatedPost = new Post(content, user, productUrl, title);
  try {
    const result = await updatedPost.update(postId);
    console.log(result);
    res.status(201).json({
      msg: "updated successfuly",
      result,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
