import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { photoUpload, postImageResize } from "../middleware/photoUpload.js";
import {
  createPostCtrl,
  deletePostCtrl,
  fetchPostCtrl,
  fetchPostsCtrl,
  toggleAddDislikeToPostCtrl,
  toggleAddLikeToPostCtrl,
  updatePost,
} from "../controllers/postsCtrl.js";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  photoUpload.single("image"),
  postImageResize,
  createPostCtrl
);
router.get("/", fetchPostsCtrl).get("/:id", fetchPostCtrl);
router
  .put("/:id", authMiddleware, updatePost)
  .put("/add/likes", authMiddleware, toggleAddLikeToPostCtrl)
  .put("/dislike/post", authMiddleware, toggleAddDislikeToPostCtrl);
router.delete("/:id", authMiddleware, deletePostCtrl);

export default router;
