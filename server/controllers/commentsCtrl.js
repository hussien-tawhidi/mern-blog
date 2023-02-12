import asyncHandler from "express-async-handler";
import Comment from "../models/comments.js";
import validateMongodbId from "../utils/validMongodbId.js";
// ------------------------------
//create posts
// ------------------------------
export const createCommentCtrl = asyncHandler(async (req, res) => {
  //1.Get the user
  const user = req.user;
  //2.Get the post Id
  const { postId, description } = req.body;
  console.log(description);
  try {
    const comment = await Comment.create({
      post: postId,
      user,
      description,
    });
    res.status(200).json(comment);
  } catch (error) {
    res.status(404).json(error);
  }
});

// ------------------------------
//fetch all posts
// ------------------------------
export const fetchAllCommentsCtrl = asyncHandler(async (req, res) => {
  try {
    const comments = await Comment.find({}).sort("-created");
    res.status(200).json(comments);
  } catch (error) {
    res.status(404).json(error);
  }
});

// ------------------------------
//get single posts
// ------------------------------
export const fetchCommentCtrl = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const comment = await Comment.findById(id);
    res.status(200).json(comment);
  } catch (error) {
    res.json(error);
  }
});

// ------------------------------
//update posts
// ------------------------------
export const updateCommentCtrl = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const update = await Comment.findByIdAndUpdate(
      id,
      {
        post: req.body.postId,
        user: req?.user,
        description: req?.body.description,
      },
      { new: true, runValidators: true }
    );
    res.status(200).json(update);
  } catch (error) {
    res.status(200).json("update comment");
  }
});

// ------------------------------
//delete posts
// ------------------------------
export const deleteCommentCtrl = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
     const comment=await Comment.findByIdAndDelete(id)
    res.status(200).json(comment);
  } catch (error) {
    res.status(200).json(error);
  }
});
