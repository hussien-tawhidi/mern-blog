import express from "express";
import {
  createCategoryCtrl,
  deletCategoryCtrl,
  fetchAllCategoryCtrl,
  fetchSingleCategoryCtrl,
  updateCategoryCtrl,
} from "../controllers/categoryCtrl.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createCategoryCtrl);
router
  .get("/", authMiddleware, fetchAllCategoryCtrl)
  .get("/:id", authMiddleware, fetchSingleCategoryCtrl);
router.put("/:id", authMiddleware, updateCategoryCtrl);
router.delete("/:id", authMiddleware, deletCategoryCtrl);
export default router;
