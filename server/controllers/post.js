const Users = require('../models/User');
const Post = require('../models/Post');

const getFeedPosts = async (req, res) => {
  try {
    const post = await Post.find(); //find all posts
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await Post.find({ userId }); //find all posts by user
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id); //find post by id
    const isLiked = post.likes.get(userId); //	const isLiked = post.likes.get(userId);
    if (!isLiked) {
      post.likes.set(userId, true); //if not liked, set to true
    } else {
      post.likes.delete(userId); //if liked, delete
    }
    const updatedPost = await Post.findByIdAndUpdate(id, post, { new: true }); //update post

    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
const createPost = async (req, res) => {
  try {
    const { description, picturePath } = req.body;
    const user = await Users.findById(req.body.userId);
    const newPost = new Post({
      firstName: user.firstName,
      lastName: user.lastName,
      userId: user._id,
      location: user.location,
      description,
      picturePath,
      likes: {},
      comments: {},
    }); //create new post
    await newPost.save();

    const post = await Post.find(); //find all posts
    res.status(200).json(post);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

module.exports = {
  getFeedPosts,
  getUserPosts,
  likePost,
  createPost,
};
