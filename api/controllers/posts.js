const Post = require("../models/post");
const { generateToken } = require("../lib/token");

async function getAllPosts(req, res) {
  const posts = await Post.find().sort({createdAt: - 1}).populate('user_id', 'profilePicture username') //.populate('likes', 'username userId');
  const token = generateToken(req.user_id);
  res.status(200).json({ posts: posts, token: token });
}

async function createPost(req, res) {
  const post = new Post(req.body);
  await post.save();
  const newToken = generateToken(req.user_id);
  await post.populate('user_id', 'profilePicture username') //.populate('likes', 'username userId');
  res.status(201).json({ post: post, token: newToken });
}

async function updatePost(req, res){ 
  const {id} = req.params;
  const post = await Post.findByIdAndUpdate(id, {$set: req.body}, {new: true}).populate('user_id', 'profilePicture username') //.populate('likes', 'username userId');

  const newToken = generateToken(req.user_id);
  res.status(202).json({post: post, token: newToken});
}

async function deletePost(req, res){
  const {id} = req.params;
  const post = await Post.findByIdAndDelete(id);
  const newToken = generateToken(req.user_id);
  res.status(202).json({post: post, token: newToken});
}

const PostsController = {
  getAllPosts: getAllPosts,
  createPost: createPost,
  updatePost: updatePost,
  deletePost: deletePost
};

module.exports = PostsController;
