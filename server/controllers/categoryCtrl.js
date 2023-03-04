import asyncHandler from "express-async-handler";
import Category from "../models/Category.js";
import validateMongodbId from "../utils/validMongodbId.js";

// -----------------------------
// create category
// -----------------------------
export const createCategoryCtrl = asyncHandler(async (req, res) => {
  try {
    const category = await Category.create({
      user: req.user._id,
      title: req.body.title,
    });
    res.status(200).json(category);
  } catch (error) {
    throw new Error(error);
    // res.status(404).json(error);
  }
});

// -----------------------------
// get all category
// -----------------------------
export const fetchAllCategoryCtrl = asyncHandler(async (req, res) => {
  try {
    const categories = await Category.find({})
      .populate("user")
      .sort("-createdAt");
    res.status(200).json(categories);
  } catch (error) {
    res.status(404).json(error);
  }
});

// -----------------------------
// get single category
// -----------------------------
export const fetchSingleCategoryCtrl = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const category = await Category.findById(id)
      .populate("user")
      .sort("-createdAt");
    res.status(200).json(category);
  } catch (error) {
    res.status(404).json(error);
  }
});

// -----------------------------
// update category
// -----------------------------
export const updateCategoryCtrl = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const category = await Category.findByIdAndUpdate(
      id,
      {
        title: req?.body?.title,
      },
      { new: true, runValidators: true }
    );
    res.status(200).json(category);
  } catch (error) {
    res.status(404).json(error);
  }
});

// -----------------------------
// delet category
// -----------------------------
export const deletCategoryCtrl = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const category = await Category.findByIdAndDelete(id);
    res.status(200).json(category);
  } catch (error) {
    res.status(404).json(error);
  }
});
