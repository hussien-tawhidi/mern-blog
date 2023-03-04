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

// user login
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
      localStorage.removeItem("userInfo");
    } catch (error) {
      if (!error?.message) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

// -----------------------
// user profile
// -----------------------
export const userProfileAction = createAsyncThunk(
  "users/profile",
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
        `${baseUrl}/api/users/profile/${id}`,
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
// upload profile photo
// -----------------------
export const uploadProfilPhotoAction = createAsyncThunk(
  "post/upload-profile-photo",
  async (userImage, { rejectWithValue, getState, dispatch }) => {
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
      formData.append("image", userImage?.image);
      const { data } = await axios.put(
        `${baseUrl}/api/users/profile/photo/upload`,
        formData,
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
// update user
// -----------------------
export const updateProfileAction = createAsyncThunk(
  "user/update-profile",
  async (userData, { rejectWithValue, getState, dispatch }) => {
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
        `${baseUrl}/api/users`,
        {
          firstName: userData?.firstName,
          lastName: userData?.lastName,
          bio: userData?.bio,
          email: userData?.email,
        },
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
// follow
// -----------------------
export const followUserAction = createAsyncThunk(
  "user/follow-user",
  async (userToFollowId, { rejectWithValue, getState, dispatch }) => {
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
        `${baseUrl}/api/users/this/follow`,
        {
          followId: userToFollowId,
        },
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
// unfollow
// -----------------------
export const unFollowUserAction = createAsyncThunk(
  "user/unFollow-user",
  async (unFollowId, { rejectWithValue, getState, dispatch }) => {
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
        `${baseUrl}/api/users/this/unfollow`,
        {
          unFollowId,
        },
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
//reset send email
// -----------------------
export const resetSendEmailAction = createAsyncThunk("user/reset/send-email");

// -----------------------
// send email to user
// -----------------------
export const sendEmailAction = createAsyncThunk(
  "user/send-email",
  async (email, { rejectWithValue, getState, dispatch }) => {
    //get user token
    const user = getState()?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    try {
      const { data } = await axios.post(
        `${baseUrl}/api/email`,
        {
          to: email?.recipientEmail,
          subject: email?.subject,
          message: email?.message,
        },
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
// send email to verified an account
// -----------------------
export const sendEmailToVerfiedAccountAction = createAsyncThunk(
  "send/token/to/verified/account",
  async (email, { rejectWithValue, getState, dispatch }) => {
    //get user token
    const user = getState()?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    try {
      const { data } = await axios.post(
        `${baseUrl}/api/users/generate-verify-email-token`,
        {},
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
//verified an account
// -----------------------
export const userVerfiedAccountAction = createAsyncThunk(
  "user/token/verified",
  async (token, { rejectWithValue, getState, dispatch }) => {
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
        `${baseUrl}/api/users/verified/account`,
        { token },
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
// viewedby action
// -----------------------
export const viewedBytAction = createAsyncThunk(
  "user/token/verified",
  async (token, { rejectWithValue, getState, dispatch }) => {
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
        `${baseUrl}/api/users/verified/account`,
        { token },
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
// fetch all users
// -----------------------
export const fetchAllUsersAction = createAsyncThunk(
  "users/fetch/all",
  async (allUser, { rejectWithValue, getState, dispatch }) => {
    // get token
    const user = getState()?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    try {
      const { data } = await axios.get(`${baseUrl}/api/users`, config);
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
//block user
// -----------------------
export const blockUserAction = createAsyncThunk(
  "users/block/action",
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
      const { data } = await axios.put(
        `${baseUrl}/api/users/block-user/${id}`,
        {},
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
// unblock user
// -----------------------
export const unBlockUserAction = createAsyncThunk(
  "users/unblock/action",
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
      const { data } = await axios.put(
        `${baseUrl}/api/users/unblock-user/${id}`,
        {},
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
// update password
// -----------------------
export const updatePasswordAction = createAsyncThunk(
  "user/update/password",
  async (password, { rejectWithValue, getState, dispatch }) => {
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
        `${baseUrl}/api/users/change/password`,
        {
          password,
        },
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
// password reset token generator
// -----------------------
export const passwordResetTokenAction = createAsyncThunk(
  "send/forgot/password/email",
  async (email, { rejectWithValue, getState, dispatch }) => {
    //get user token
    const user = getState()?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    try {
      const { data } = await axios.post(
        `${baseUrl}/api/users/forget-password`,
        { email },
        config
      );

      return data;
    } catch (error) {
      if (!error?.response) throw error;
      return rejectWithValue(error?.response?.data);
    }
  }
);

//Password reset
export const passwordResetAction = createAsyncThunk(
  "password/reset/from/email",
  async (user, { rejectWithValue, getState, dispatch }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    //http call
    try {
      const { data } = await axios.put(
        `${baseUrl}/api/users/password/reset`,
        { password: user?.password, token: user?.token },
        config
      );
      return data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);
