import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  accountVerificationCtrl,
  blockUserCtrl,
  deleteUsersCtrl,
  fetchUserDetailsCtrl,
  fetchUsersCtrl,
  followingUserCtrl,
  forgetPasswordToken,
  generateVerificationTokenCtrl,
  loginUserCtrl,
  passwordResetToken,
  profilePhotoUploadCtrl,
  registerUserCtrl,
  unBlockUserCtrl,
  unFollowUserCtrl,
  updateUserPasswordCtrl,
  updateUserProfileCtrl,
  userProfileCtrl,
} from "../controllers/userCrtl.js";
import { profilePhotoUpload } from "../middleware/profileUploadPhoto.js";

const router = express.Router();

router
  .post("/register", registerUserCtrl)
  .post("/login", loginUserCtrl)
  .post("/forget-password", forgetPasswordToken)
  .post(
    "/generate-verify-email-token",
    authMiddleware,
    authMiddleware,
    generateVerificationTokenCtrl
  );
router
  .get("/", authMiddleware, fetchUsersCtrl)
  .get("/:id", fetchUserDetailsCtrl)
  .get("/profile/:id", authMiddleware, userProfileCtrl);
router
  .put("/:id", authMiddleware, updateUserProfileCtrl)
  .put("/change/password", authMiddleware, updateUserPasswordCtrl)
  .put("/user/follow", authMiddleware, followingUserCtrl)
  .put("/user/unfollow", authMiddleware, unFollowUserCtrl)
  .put("/block-user/:id", authMiddleware, blockUserCtrl)
  .put("/unblock-user/:id", authMiddleware, unBlockUserCtrl)
  .put("/verified/account", authMiddleware, accountVerificationCtrl)
  .put("/password/reset", passwordResetToken)
  .put(
    "/profile/photo/upload",
    authMiddleware,
    profilePhotoUpload.single("image"),
    profilePhotoUploadCtrl
  );

router.delete("/:id", deleteUsersCtrl);

export default router;
