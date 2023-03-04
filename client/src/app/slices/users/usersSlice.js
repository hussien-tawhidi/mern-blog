import { createSlice } from "@reduxjs/toolkit";
import {
  followUserAction,
  loginUserAction,
  logoutUserAction,
  registerUserAction,
  unFollowUserAction,
  updateProfileAction,
  uploadProfilPhotoAction,
  sendEmailAction,
  userProfileAction,
  resetSendEmailAction,
  sendEmailToVerfiedAccountAction,
  userVerfiedAccountAction,
  fetchAllUsersAction,
  blockUserAction,
  unBlockUserAction,
  updatePasswordAction,
  passwordResetTokenAction,
  passwordResetAction,
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
      })
      .addCase(logoutUserAction.rejected, (state, action) => {
        state.loading = false;
        state.appErr = action?.payload?.message;
        state.serverErr = action?.error?.message;
      })
      .addCase(userProfileAction.pending, (state, action) => {
        state.loading = true;
        state.appErr = undefined;
        state.serverErr = undefined;
      })
      .addCase(userProfileAction.fulfilled, (state, action) => {
        state.profile = action?.payload;
        state.loading = false;
        state.appErr = undefined;
        state.serverErr = undefined;
      })
      .addCase(userProfileAction.rejected, (state, action) => {
        state.appErr = action?.payload?.message;
        state.serverErr = action?.error?.message;
        state.loading = false;
      })
      .addCase(uploadProfilPhotoAction.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(uploadProfilPhotoAction.fulfilled, (state, action) => {
        state.profilePhoto = action?.payload;
        state.loading = false;
        state.appErr = undefined;
        state.serverErr = undefined;
      })
      .addCase(uploadProfilPhotoAction.rejected, (state, action) => {
        state.appErr = action?.payload?.message;
        state.serverErr = action?.error?.message;
        state.loading = false;
      })
      .addCase(updateProfileAction.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(updateProfileAction.fulfilled, (state, action) => {
        state.updateUser = action?.payload;
        state.loading = false;
        state.appErr = undefined;
        state.serverErr = undefined;
      })
      .addCase(updateProfileAction.rejected, (state, action) => {
        state.appErr = action?.payload?.message;
        state.serverErr = action?.error?.message;
        state.loading = false;
      })
      .addCase(followUserAction.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(followUserAction.fulfilled, (state, action) => {
        state.followed = action?.payload;
        state.profileLoading = false;
        state.profileAppErr = undefined;
        state.profileServerErr = undefined;
      })
      .addCase(followUserAction.rejected, (state, action) => {
        state.profileAppErr = action?.payload?.message;
        state.profileServerErr = action?.error?.message;
        state.loading = false;
      })
      .addCase(unFollowUserAction.pending, (state, action) => {
        state.unfollowLoading = true;
        state.unFollowedAppErr = undefined;
        state.unfollowServerErr = undefined;
      })
      .addCase(unFollowUserAction.fulfilled, (state, action) => {
        state.unfollowLoading = false;
        state.unFollowed = action?.payload;
        state.followed = undefined;
        state.unFollowedAppErr = undefined;
        state.unfollowServerErr = undefined;
      })
      .addCase(unFollowUserAction.rejected, (state, action) => {
        state.unfollowLoading = false;
        state.unFollowedAppErr = action?.payload?.message;
        state.unfollowServerErr = action?.error?.message;
      })
      .addCase(sendEmailAction.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(resetSendEmailAction.fulfilled, (state, action) => {
        state.isSendEmail = false;
      })
      .addCase(sendEmailAction.fulfilled, (state, action) => {
        state.loading = false;
        state.sendEmail = action?.payload;
        state.isSendEmail = true;
      })
      .addCase(sendEmailAction.rejected, (state, action) => {
        state.isSendEmail = undefined;
        state.loading = false;
        state.unFollowedAppErr = action?.payload?.message;
        state.unfollowServerErr = action?.error?.message;
      })
      .addCase(sendEmailToVerfiedAccountAction.pending, (state, action) => {
        state.verificationLoading = true;
      })
      .addCase(sendEmailToVerfiedAccountAction.fulfilled, (state, action) => {
        state.verificationLoading = false;
        state.accountVerification = action?.payload;
        state.isSendEmail = true;
      })
      .addCase(sendEmailToVerfiedAccountAction.rejected, (state, action) => {
        state.isSendEmail = undefined;
        state.verificationLoading = false;
        state.sendEmailToVerifiedAppError = action?.payload?.message;
        state.sendEmailToVerifiedServerError = action?.error?.message;
      })
      .addCase(userVerfiedAccountAction.pending, (state, action) => {
        state.verifiedAccountLoading = true;
      })
      .addCase(userVerfiedAccountAction.fulfilled, (state, action) => {
        state.verifiedAccountLoading = false;
        state.verified = action?.payload;
        state.isVerified = false;
        state.verifiedAppErr = undefined;
        state.verfiedServerErr = undefined;
      })
      .addCase(userVerfiedAccountAction.rejected, (state, action) => {
        state.verifiedAccountLoading = false;
        state.verifiedAppErr = action?.payload?.message;
        state.verfiedServerErr = action?.error?.message;
      })
      .addCase(fetchAllUsersAction.pending, (state, action) => {
        state.fetchAllUsersLoading = true;
      })
      .addCase(fetchAllUsersAction.fulfilled, (state, action) => {
        state.fetchAllUsersLoading = false;
        state.allUsers = action?.payload;
        state.allUsersAppErr = undefined;
        state.allUsersServerErr = undefined;
      })
      .addCase(fetchAllUsersAction.rejected, (state, action) => {
        state.fetchAllUsersLoading = false;
        state.allUsersAppErr = action?.payload?.message;
        state.allUsersServerErr = action?.error?.message;
      })
      .addCase(blockUserAction.pending, (state, action) => {
        state.blockUserLoading = true;
      })
      .addCase(blockUserAction.fulfilled, (state, action) => {
        state.blockUserLoading = false;
        state.block = action?.payload;
        state.userBlockAppErr = undefined;
        state.userBlockServerErr = undefined;
      })
      .addCase(blockUserAction.rejected, (state, action) => {
        state.blockUserLoading = false;
        state.userBlockAppErr = action?.payload?.message;
        state.userBlockServerErr = action?.error?.message;
      })
      .addCase(unBlockUserAction.pending, (state, action) => {
        state.unBlockUserLoading = true;
      })
      .addCase(unBlockUserAction.fulfilled, (state, action) => {
        state.unBlockUserLoading = false;
        state.unBlock = action?.payload;
        state.userUnBlockAppErr = undefined;
        state.userUnBlockServerErr = undefined;
      })
      .addCase(unBlockUserAction.rejected, (state, action) => {
        state.unBlockUserLoading = false;
        state.userUnBlockAppErr = action?.payload?.message;
        state.userUnBlockServerErr = action?.error?.message;
      })
      .addCase(updatePasswordAction.pending, (state, action) => {
        state.changePasswordLoading = true;
      })
      .addCase(updatePasswordAction.fulfilled, (state, action) => {
        state.changePasswordLoading = false;
        state.changePassword = action?.payload;
        state.changePasswordAppErr = undefined;
        state.changePasswordServerErr = undefined;
      })
      .addCase(updatePasswordAction.rejected, (state, action) => {
        state.changePasswordLoading = false;
        state.changePasswordAppErr = action?.payload?.message;
        state.changePasswordServerErr = action?.error?.message;
      })
      .addCase(passwordResetTokenAction.pending, (state, action) => {
        state.passwordResetTokenLoading = true;
      })
      .addCase(passwordResetTokenAction.fulfilled, (state, action) => {
        state.passwordResetTokenLoading = false;
        state.passwordResetToken = action?.payload;
        state.passResetFromAppErr = undefined;
        state.passResetFromServerErr = undefined;
      })
      .addCase(passwordResetTokenAction.rejected, (state, action) => {
        state.passwordResetTokenLoading = false;
        state.passResetFromAppErr = action?.payload?.message;
        state.passResetFromServerErr = action?.error?.message;
      })
      .addCase(passwordResetAction.pending, (state, action) => {
        state.resetPassLoading = true;
        state.isReseted=false
      })
      .addCase(passwordResetAction.fulfilled, (state, action) => {
        state.resetPassLoading = false;
        state.passwordReset = action?.payload;
        state.isReseted = true;
        state.passwordResetAppErr = undefined;
        state.passwordResetServerErr = undefined;
      })
      .addCase(passwordResetAction.rejected, (state, action) => {
        state.resetPassLoading = false;
        state.isReseted = false;
        state.passwordResetAppErr = action?.payload?.message;
        state.passwordResetServerErr = action?.error?.message;
      });
  },
});

export default usersSlices.reducer;
