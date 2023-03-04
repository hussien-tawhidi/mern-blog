import { createSlice } from "@reduxjs/toolkit";
import {  createCommentAction, deletCommentAction, fetchCommentAction, updateCommentAction } from "./commentActions";

const commentSlice = createSlice({
  name: "comment",
  initialState: { },
  extraReducers: (builder) => {
    builder
      .addCase(createCommentAction.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(createCommentAction.fulfilled, (state, action) => {
        state.loading = false;
        state.createComment = action?.payload;
        state.appErr = undefined;
        state.serverErr = undefined;
      })
      .addCase(createCommentAction.rejected, (state, action) => {
        state.loading = false;
        state.appErr = action?.payload?.message;
        state.serverErr = action?.error?.message;
      })
      .addCase(deletCommentAction.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(deletCommentAction.fulfilled, (state, action) => {
        state.loading = false;
        state.deletedComment = action?.payload;
        state.appErr = undefined;
        state.serverErr = undefined;
      })
      .addCase(deletCommentAction.rejected, (state, action) => {
        state.loading = false;
        state.appErr = action?.payload?.message;
        state.serverErr = action?.error?.message;
      })
      .addCase(updateCommentAction.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(updateCommentAction.fulfilled, (state, action) => {
        state.loading = false;
        state.updateComment = action?.payload;
        state.appErr = undefined;
        state.serverErr = undefined;
      })
      .addCase(updateCommentAction.rejected, (state, action) => {
        state.loading = false;
        state.appErr = action?.payload?.message;
        state.serverErr = action?.error?.message;
      })
      .addCase(fetchCommentAction.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchCommentAction.fulfilled, (state, action) => {
        state.loading = false;
        state.commentDetails = action?.payload;
        state.appErr = undefined;
        state.serverErr = undefined;
      })
      .addCase(fetchCommentAction.rejected, (state, action) => {
        state.loading = false;
        state.appErr = action?.payload?.message;
        state.serverErr = action?.error?.message;
      });
  },
});

export default commentSlice.reducer