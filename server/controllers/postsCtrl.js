import asyncHandler from "express-async-handler";
import Filter from "bad-words";
import fs from "fs";
import Post from "../models/Post.js";
import User from "../models/User.js";
import validateMongodbId from "../utils/validMongodbId.js";
import cloudinaryUploadImg from "../utils/cloudinary.js";

// ------------------------------
//create posts
// ------------------------------
export const createPostCtrl = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  // validateMongodbId(req.body.user);
  //Check for bad words
  const filter = new Filter();
  const isProfane = filter.isProfane(req.body.title, req.body.description);
  //Block user
  if (isProfane) {
    await User.findByIdAndUpdate(_id, {
      isBlocked: true,
    });
    throw new Error(
      "Creating Failed because it contains profane words and you have been blocked"
    );
  }

  //1. Get the oath to img
  const localPath = `public/images/posts/${req.file.filename}`;
  //2.Upload to cloudinary
  const imgUploaded = await cloudinaryUploadImg(localPath);
  try {
    const post = await Post.create({
      ...req.body,
      image: imgUploaded?.url,
      user: _id,
    });
    res.json(post);
    //Remove uploaded img
    fs.unlinkSync(localPath);
  } catch (error) {
    res.json(error);
  }
});

// ------------------------------
//get all posts
// ------------------------------
export const fetchPostsCtrl = asyncHandler(async (req, res) => {
  try {
    const posts = await Post.find({}).populate("user");
    res.json(posts);
  } catch (error) {
    res.json(error);
  }
});

// ------------------------------
//get single posts
// ------------------------------
export const fetchPostCtrl = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);

  try {
    const post = await Post.findById(id)
      .populate("user")
      .populate("disLikes")
      .populate("likes");
    // update number of views
    await Post.findByIdAndUpdate(
      id,
      {
        $inc: { numViews: 1 },
      },
      { new: true }
    );

    res.json(post);
  } catch (error) {
    res.json(error);
  }
});

// ------------------------------
//update posts
// ------------------------------
export const updatePost = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const post = await Post.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );
    res.status(404).json(post);
  } catch (error) {
    res.status(404).json(error);
  }
});

// ------------------------------
//delete posts
// ------------------------------
export const deletePostCtrl = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);

  try {
    const post = await Post.findByIdAndDelete(id);
    res.status(200).json(post);
  } catch (error) {
    res.json(error);
  }
});

// ------------------------------
//likes posts
// ------------------------------
export const toggleAddLikeToPostCtrl = asyncHandler(async (req, res) => {
  //1.Find the post to be liked
  const { postId } = req.body;
  const post = await Post.findById(postId);
  //2. Find the login user
  const loginUserId = req?.user?._id;
  //3. Find is this user has liked this post?
  const isLiked = post?.isLiked;
  //4.Chech if this user has dislikes this post
  const alreadyDisliked = post?.disLikes?.find(
    (userId) => userId?.toString() === loginUserId?.toString()
  );
  //5.remove the user from dislikes array if exists
  if (alreadyDisliked) {
    const post = await Post.findByIdAndUpdate(
      postId,
      {
        $pull: { disLikes: loginUserId },
        isDisLiked: false,
      },
      { new: true }
    );
    res.json(post);
  }
  //Toggle
  //Remove the user if he has liked the post
  if (isLiked) {
    const post = await Post.findByIdAndUpdate(
      postId,
      {
        $pull: { likes: loginUserId },
        isLiked: false,
      },
      { new: true }
    );
    res.json(post);
  } else {
    //add to likes
    const post = await Post.findByIdAndUpdate(
      postId,
      {
        $push: { likes: loginUserId },
        isLiked: true,
      },
      { new: true }
    );
    res.json(post);
  }
});

// ------------------------------
//dislike posts
// ------------------------------
export const toggleAddDislikeToPostCtrl = asyncHandler(async (req, res) => {
  //1.Find the post to be disliked
  const { postId } = req.body;
  const post = await Post.findById(postId);
  //2. Find the login user
  const loginUserId = req?.user?._id;
  //3. Find is this user has disliked this post?
  const isDisLiked = post?.isDisLike;
  //4.Chech if this user has likes this post
  const alreadyliked = post?.likes?.find(
    (userId) => userId?.toString() === loginUserId?.toString()
  );

  //5.remove the user from dislikes array if exists
  if (alreadyliked) {
    const post = await Post.findByIdAndUpdate(
      postId,
      {
        $pull: { likes: loginUserId },
        isLiked: false,
      },
      { new: true }
    );
    res.json(post);
  }
  //Toggle
  //Remove the user if he has liked the post
  if (isDisLiked) {
    const post = await Post.findByIdAndUpdate(
      postId,
      {
        $pull: { disLikes: loginUserId },
        isDisLike: false,
      },
      { new: true }
    );
    res.json(post);
  } else {
    //add to likes
    const post = await Post.findByIdAndUpdate(
      postId,
      {
        $push: { disLikes: loginUserId },
        isDisLike: true,
      },
      { new: true }
    );
    res.json(post);
  }

  // res.json();
});
