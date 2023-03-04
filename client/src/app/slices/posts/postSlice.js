import { createSlice } from "@reduxjs/toolkit";
import {
  createPostAction,
  disLikePostAction,
  fetchPostAction,
  fetchPostsAction,
  likePostAction,
  resetPost,
  updatePostAction,
  resetPostEdit,
  deletePostAction,
} from "./postsActions";

const postSlice = createSlice({
  name: "post",
  initialState: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPostAction.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(resetPost, (state, action) => {
        state.isCreated = true;
      })
      .addCase(createPostAction.fulfilled, (state, action) => {
        state.postCreated = action?.payload;
        state.loading = false;
        state.isCreated = false;
        state.appErr = undefined;
        state.serverErr = undefined;
      })
      .addCase(createPostAction.rejected, (state, action) => {
        state.loading = false;
        state.appErr = action?.payload?.message;
        state.serverErr = action?.error?.message;
      })
      .addCase(fetchPostsAction.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchPostsAction.fulfilled, (state, action) => {
        state.postLists = action?.payload;
        state.loading = false;
        state.appErr = undefined;
        state.serverErr = undefined;
      })
      .addCase(fetchPostsAction.rejected, (state, action) => {
        state.loading = false;
        state.appErr = action?.payload?.message;
        state.serverErr = action?.error?.message;
      })
      .addCase(likePostAction.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(likePostAction.fulfilled, (state, action) => {
        state.likes = action?.payload;
        state.loading = false;
        state.appErr = undefined;
        state.serverErr = undefined;
      })
      .addCase(likePostAction.rejected, (state, action) => {
        state.loading = false;
        state.appErr = action?.payload?.message;
        state.serverErr = action?.error?.message;
      })
      .addCase(disLikePostAction.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(disLikePostAction.fulfilled, (state, action) => {
        state.disLikes = action?.payload;
        state.loading = false;
        state.appErr = undefined;
        state.serverErr = undefined;
      })
      .addCase(disLikePostAction.rejected, (state, action) => {
        state.loading = false;
        state.appErr = action?.payload?.message;
        state.serverErr = action?.error?.message;
      })
      .addCase(fetchPostAction.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchPostAction.fulfilled, (state, action) => {
        state.postDetails = action?.payload;
        state.loading = false;
        state.appErr = undefined;
        state.serverErr = undefined;
      })
      .addCase(fetchPostAction.rejected, (state, action) => {
        state.loading = false;
        state.appErr = action?.payload?.message;
        state.serverErr = action?.error?.message;
      })
      .addCase(updatePostAction.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(resetPostEdit, (state, action) => {
        state.isUpdated = true;
      })
      .addCase(updatePostAction.fulfilled, (state, action) => {
        state.postUpdated = action?.payload;
        state.loading = false;
        state.appErr = undefined;
        state.serverErr = undefined;
         state.isUpdated = false;
      })
      .addCase(updatePostAction.rejected, (state, action) => {
        state.loading = false;
        state.appErr = action?.payload?.message;
        state.serverErr = action?.error?.message;
      })
      .addCase(deletePostAction.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(deletePostAction.fulfilled, (state, action) => {
        state.deletePost = action?.payload;
        state.loading = false;
        state.appErr = undefined;
        state.serverErr = undefined;
         state.isUpdated = false;
      })
      .addCase(deletePostAction.rejected, (state, action) => {
        state.loading = false;
        state.appErr = action?.payload?.message;
        state.serverErr = action?.error?.message;
      });
  },
});

export default postSlice.reducer;
