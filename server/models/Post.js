import mongoose from "mongoose";

const postSechema = new mongoose.Schema(
  {
    title: {
      type: String,
      // required: [true, "post title is required"],
      trim: true,
    },
    catergory: {
      type: String,
      // required: [true, "post category is required"],
      default: "all",
    },
    isLiked: {
      type: Boolean,
      default: false,
    },
    isDisLike: {
      type: Boolean,
      default: false,
    },
    numViews: {
      type: Number,
      default: 0,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    disLikes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "author is required"],
    },
    description: {
      type: String,
      // required: [true, "post description is required"],
    },
    image: {
      type: String,
      default:
        "https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg",
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

const Post = mongoose.model("Post", postSechema);
export default Post;
