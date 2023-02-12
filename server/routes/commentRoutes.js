import express from "express";
import {
  createCommentCtrl,
  deleteCommentCtrl,
  fetchAllCommentsCtrl,
  fetchCommentCtrl,
  updateCommentCtrl,
} from "../controllers/commentsCtrl.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createCommentCtrl);
router.get("/", authMiddleware, fetchAllCommentsCtrl);
router.get("/:id", authMiddleware, fetchCommentCtrl);
router.put("/:id", authMiddleware, updateCommentCtrl);
router.delete("/:id", authMiddleware, deleteCommentCtrl);

export default router;
