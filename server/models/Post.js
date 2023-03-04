import mongoose from "mongoose";

const postSechema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "post title is required"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "post category is required"],
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
      default: 18,
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
        "https://cdn.pixabay.com/photo/2020/10/25/09/23/seagull-5683637_960_720.jpg",
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

// populate comments
// ---------------
// COMMENTS is the name of the this populate we could access any where else by this name
// COMMENT is the _id of the comment model or the name of the model 
// 

postSechema.virtual("comments", {
  ref: "Comment",
  foreignField: "post",
  localField: "_id",
});

const Post = mongoose.model("Post", postSechema);
export default Post;
