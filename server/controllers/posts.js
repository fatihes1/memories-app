// Create all the handler for our posts routes
import PostModel from "../models/posts.js";

export const getPosts = async (req, res) => {
  try {
    const allPost = await PostModel.find();

    res.status(200).json(allPost);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  const body = req.body;
  const newPost = new PostModel(body);
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
