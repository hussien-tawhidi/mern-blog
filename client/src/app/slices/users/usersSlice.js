import { createSlice } from "@reduxjs/toolkit";
import {
  loginUserAction,
  logoutUserAction,
  registerUserAction,
} from "./usersActions";

// get user info from localstorage
const userLoginFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

// slices
const usersSlices = createSlice({
  name: "users",
  initialState: { userAuth: userLoginFromStorage },
  // reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUserAction.pending, (state, action) => {
        state.loading = true;
        state.appErr = undefined;
        state.serverErr = undefined;
      })
      .addCase(registerUserAction.fulfilled, (state, action) => {
        state.loading = false;
        state.registered = action?.payload;
        state.appErr = undefined;
        state.serverErr = undefined;
      })
      .addCase(registerUserAction.rejected, (state, action) => {
        console.log(action.payload);
        state.loading = false;
        state.appErr = action?.payload?.message;
        state.serverErr = action?.error?.message;
      })
      .addCase(loginUserAction.pending, (state, action) => {
        state.loading = true;
        state.appErr = undefined;
        state.serverErr = undefined;
      })
      .addCase(loginUserAction.fulfilled, (state, action) => {
        state.loading = false;
        state.userAuth = action?.payload;
        state.appErr = undefined;
        state.serverErr = undefined;
      })
      .addCase(loginUserAction.rejected, (state, action) => {
        state.loading = false;
        state.appErr = action?.payload?.message;
        state.serverErr = action?.error?.message;
      })
      .addCase(logoutUserAction.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(logoutUserAction.fulfilled, (state, action) => {
        state.userAuth = undefined;
         state.appErr = undefined;
        state.serverErr = undefined;
        state.loading = false;
      }).addCase(logoutUserAction.rejected, (state, action) => {
         state.loading = false;
         state.appErr = action?.payload?.message;
         state.serverErr = action?.error?.message;
      });
  },
});

export default usersSlices.reducer;
