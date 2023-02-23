import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../../utils/BasedUrld";

// user registere
export const registerUserAction = createAsyncThunk(
  "users/register",
  async (user, { rejectWithValue, getState, dispatch }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        `${baseUrl}/api/users/register`,
        user,
        config
      );
      return data;
    } catch (error) {
      if (!error.message) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

// user register
export const loginUserAction = createAsyncThunk(
  "users/login",
  async (user, { rejectWithValue, getState, dispatch }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        `${baseUrl}/api/users/login`,
        user,
        config
      );
      // save user to local storage
      localStorage.setItem("userInfo", JSON.stringify(data));
      return data;
    } catch (error) {
      if (!error?.message) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

// user logout
export const logoutUserAction = createAsyncThunk(
  "users/logout",
  async (payload, { rejectWithValue, getState, dispatch }) => {
   

    try {
      // save user to local storage
      localStorage.removeItem("userInfo", );
    } catch (error) {
      if (!error?.message) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);
