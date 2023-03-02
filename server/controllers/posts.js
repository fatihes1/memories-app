// Create all the handler for our posts routes
import mongoose from "mongoose";
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

export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;
  // console.log("Deneme: ", _id);
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(405).send("No post with that id");
  }

  const updatedPost = await PostModel.findByIdAndUpdate(
    _id,
    { ...post, _id },
    {
      new: true,
    }
  );
  res.json(updatedPost);
};

export const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(405).send("No post with that id");
  }
  await PostModel.findByIdAndRemove(id);

  res.json({ message: "Post deleted successfully" });
};

export const likePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(405).send("No post with that id");
  }
  const post = await PostModel.findById(id);
  const updatedPost = await PostModel.findByIdAndUpdate(
    id,
    { likeCount: post.likeCount + 1 },
    { new: true }
  );

  res.json(updatedPost);
};
