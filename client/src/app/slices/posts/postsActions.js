import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from "../../../utils/BasedUrld";

import axios from "axios";

// -------------------------
// RESET
export const resetPost = createAction("category/reset");
export const resetPostEdit = createAction("post/reset");

// -----------------------
// create posts
// -----------------------
export const createPostAction = createAsyncThunk(
  "post/created",
  async (post, { rejectWithValue, getState, dispatch }) => {
    //get user token
    const user = getState()?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    try {
      //http call
      const formData = new FormData();
      formData.append("title", post?.title);
      formData.append("description", post?.description);
      formData.append("category", post?.category);
      formData.append("image", post?.image);

      const { data } = await axios.post(
        `${baseUrl}/api/posts`,
        formData,
        config
      );
      //dispatch action
      dispatch(resetPost());
      return data;
    } catch (error) {
      if (!error?.response) throw error;
      return rejectWithValue(error?.response?.data);
    }
  }
);

// -----------------------
// fetch all posts
// -----------------------
export const fetchPostsAction = createAsyncThunk(
  "post/fetch-all",
  async (category, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(
        `${baseUrl}/api/posts?category=${category}`
      );
      return data;
    } catch (error) {
      if (!error?.response) throw error;
      return rejectWithValue(error?.response?.data);
    }
  }
);

// -----------------------
// likes posts
// -----------------------
export const likePostAction = createAsyncThunk(
  "post/likes",
  async (postId, { rejectWithValue, getState, dispatch }) => {
    //get user token
    const user = getState()?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    try {
      const { data } = await axios.put(
        `${baseUrl}/api/posts/add/likes`,
        { postId },
        config
      );

      return data;
    } catch (error) {
      if (!error?.response) throw error;
      return rejectWithValue(error?.response?.data);
    }
  }
);

// -----------------------
// disLikes posts
// -----------------------
export const disLikePostAction = createAsyncThunk(
  "post/dis-likes",
  async (postId, { rejectWithValue, getState, dispatch }) => {
    //get user token
    const user = getState()?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    try {
      const { data } = await axios.put(
        `${baseUrl}/api/posts/dislike/post`,
        { postId },
        config
      );

      return data;
    } catch (error) {
      if (!error?.response) throw error;
      return rejectWithValue(error?.response?.data);
    }
  }
);

// -----------------------
// fetch single posts
// -----------------------
export const fetchPostAction = createAsyncThunk(
  "post/detail",
  async (id, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(`${baseUrl}/api/posts/${id}`);
      return data;
    } catch (error) {
      if (!error?.response) throw error;
      return rejectWithValue(error?.response?.data);
    }
  }
);

// -----------------------
// update posts
// -----------------------
export const updatePostAction = createAsyncThunk(
  "post/update",
  async (post, { rejectWithValue, getState, dispatch }) => {
    console.log(post);

    //get user token
    const user = getState()?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    try {
      const { data } = await axios.put(
        `${baseUrl}/api/posts/${post.id}`,
        post,
        config
      );
      dispatch(resetPostEdit());

      return data;
    } catch (error) {
      if (!error?.response) throw error;
      return rejectWithValue(error?.response?.data);
    }
  }
);

// -----------------------
// delete post
// -----------------------
export const deletePostAction = createAsyncThunk(
  "post/delete",
  async (id, { rejectWithValue, getState, dispatch }) => {
    // get token
    const user = getState()?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    try {
      const { data } = await axios.delete(
        `${baseUrl}/api/posts/${id}`,
        config
      );
      return data;
    } catch (error) {
      if (!error?.reponse) {
        throw error;
      }
      return rejectWithValue(error?.reponse?.data);
    }
  }
);