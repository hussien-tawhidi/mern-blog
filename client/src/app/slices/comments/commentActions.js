import { createAsyncThunk } from "@reduxjs/toolkit";

import { baseUrl } from "../../../utils/BasedUrld";

import axios from "axios";

// -----------------------
// create comment
// -----------------------
export const createCommentAction = createAsyncThunk(
  "comment/create",
  async (comment, { rejectWithValue, getState, dispatch }) => {
    // get token
    const user = getState()?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    try {
      const { data } = await axios.post(
        `${baseUrl}/api/comment/`,
        {
          description: comment?.description,
          postId: comment?.postId,
        },
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

// -----------------------
// delete comment
// -----------------------
export const deletCommentAction = createAsyncThunk(
  "comment/delete",
  async (commentId, { rejectWithValue, getState, dispatch }) => {
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
        `${baseUrl}/api/comment/${commentId}`,
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

// -----------------------
// update comment
// -----------------------
export const updateCommentAction = createAsyncThunk(
  "comment/update",
  async (comment, { rejectWithValue, getState, dispatch }) => {
    // get token
    const user = getState()?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    try {
      const { data } = await axios.put(
        `${baseUrl}/api/comment/${comment?.id}`,
        { description: comment?.description },
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

// -----------------------
// fetch comment details
// -----------------------
export const fetchCommentAction = createAsyncThunk(
  "comment/fetch-details",
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
      const { data } = await axios.get(
        `${baseUrl}/api/comment/${id}`,
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
