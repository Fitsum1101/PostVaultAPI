const Post = require("../Model/posts");
const deleteFile = require("../util/file");
exports.createPosts = async (req, res, next) => {
  const content = req.body.content;
  const user = req.user.id;
  console.log(req.file);
  const productUrl = req.file.path;

  const newPost = new Post(content, user, productUrl);
  try {
    const result = await newPost.save();
    res.status(201).json({
      msg: "new posts adde to user",
      post: {
        content,
      },
    });
  } catch (error) {
    error.statusCode = 500;
    next(error);
  }
};

exports.getPosts = async (req, res, next) => {
  const user = req.user.id;
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

exports.deletePost = async (req, res, next) => {
  const user_id = req.user.id;
  const post_id = req.body.postId;
  try {
    const post = await Post.fetchById(post_id);
    const deletePath = post[0][0].productURL;
    const result = await Post.deletePost(user_id, post_id);
    console.log(deletePath);
    deleteFile(deletePath);
    res.status(200).json({
      msg: "deleted succssfuly",
      result,
    });
  } catch (error) {
    next(error);
  }
};
