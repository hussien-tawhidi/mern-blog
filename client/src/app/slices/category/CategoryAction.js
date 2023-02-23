import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from "../../../utils/BasedUrld";

import axios from "axios";

// -----------------------
// create category
// -----------------------
export const createCategory = createAsyncThunk(
  "category/create",
  async (category, { rejectWithValue, getState, dispatch }) => {
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
        `${baseUrl}/api/category`,
        {
          title: category?.title,
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
// fetch all category
// -----------------------
export const fetchCategories = createAsyncThunk(
  "categories/fetch",
  async (category, { rejectWithValue, getState, dispatch }) => {
    // get token
    const user = getState()?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    try {
      const { data } = await axios.get(`${baseUrl}/api/category`, config);
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
// fetch single category
// -----------------------
export const fetchSingleCategory = createAsyncThunk(
  "categories/single",
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
      const { data } = await axios.get(`${baseUrl}/api/category/${id}`, config);
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
// update category
// -----------------------
export const updateCategory = createAsyncThunk(
  "category/update",
  async (category, { rejectWithValue, getState, dispatch }) => {
    //get user token
    const user = getState()?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    //http call
    try {
      const { data } = await axios.put(
        `${baseUrl}/api/category/${category?.id}`,
        { title: category?.title },
        config
      );
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

// -----------------------
// delete category
// -----------------------
export const deleteCategory = createAsyncThunk(
  "categories/delete",
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
        `${baseUrl}/api/category/${id}`,
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