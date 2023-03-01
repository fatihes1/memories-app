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
  console.log("Deneme: ", _id);
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
