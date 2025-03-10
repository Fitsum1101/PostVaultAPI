const Post = require("../Model/posts");

exports.createPosts = async (req, res, next) => {
  const content = req.body.content;
  const user = req.user.id;
  const newPost = new Post(content, user);
  try {
    const result = await newPost.save();
    res.statsu(201).json({
      msg: "new posts adde to user",
      post: {
        content,
      },
    });
  } catch (error) {
    error.statusCode = 500;
    throw error;
  }
};

exports.getPosts = async (req, res, next) => {
  const user = req.user.id;
  //   pagenation in needed
  try {
    const allPosts = await Post.fetchAll();
    res.statsu(200).json({
      msg: "status code accepted",
      posts: allPosts[0],
    });
  } catch (error) {
    error.statusCode = 500;
    throw error;
  }
};

exports.deletePost = async (req, res, next) => {
  const user_id = req.user.id;
  const post_id = req.params.postId;
  try {
    const result = await Post.deletePost(user_id, post_id);
    res.statsu(200).json({
      msg: "deleted succssfuly",
      result,
    });
  } catch (error) {
    error.statusCode = 500;
    throw error;
  }
};


