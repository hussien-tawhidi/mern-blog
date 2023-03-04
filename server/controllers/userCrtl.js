import User from "../models/User.js";
import asyncHandler from "express-async-handler";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import generateToken from "../config/generateToken.js";
import validateMongodbId from "../utils/validMongodbId.js";
import fs from "fs";
import cloudinaryUploadImg from "../utils/cloudinary.js";
import crypto from "crypto";

dotenv.config();

// register user
// ---------------------------------------------------------------------
export const registerUserCtrl = asyncHandler(async (req, res) => {
  const useExist = await User.findOne({ email: req.body.email });
  if (useExist) throw new Error("user already exist _ ");

  try {
    const user = await User.create({
      firstName: req?.body?.firstName,
      lastName: req?.body?.lastName,
      email: req?.body?.email,
      password: req?.body?.password,
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json(error);
  }
});

// login user
// ---------------------------------------------------------------------
export const loginUserCtrl = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const userFound = await User.findOne({ email });
  if (userFound && (await userFound.isPasswordMatched(password))) {
    res.status(200).json({
      id: userFound._id,
      firstName: userFound?.firstName,
      lastName: userFound?.lastName,
      email: userFound?.email,
      profilePhoto: userFound?.profilePhoto,
      isAdmin: userFound?.isAdmin,
      isBlocked: userFound?.isBlocked,
      token: generateToken(userFound?._id),
    });
  } else {
    throw new Error("invalid  email or password _ ");
  }
});

// get user
// ---------------------------------------------------------------------
export const fetchUsersCtrl = asyncHandler(async (req, res) => {
  const users = await User.find({}).populate("posts");
  res.status(200).json(users);
});

// delete user
// ---------------------------------------------------------------------
export const deleteUsersCtrl = asyncHandler(async (req, res) => {
  const { id } = req.params;

  validateMongodbId(id);

  const deletedUser = await User.findByIdAndDelete(id);
  res.status(200).json(deletedUser);
});

// fetch single user
// ---------------------------------------------------------------------
export const fetchUserDetailsCtrl = asyncHandler(async (req, res) => {
  const { id } = req.params;

  validateMongodbId(id);

  const user = await User.findById(id);
  res.status(200).json(user);
});

// user profile
// ---------------------------------------------------------------------
export const userProfileCtrl = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);

  // for viewed users
  // -------------------------------
  const loginUserId = await req?.user?.id?.toString();
  // -------------------------------

  try {
    const myProfile = await User.findById(id)
      .populate("posts")
      .populate("viewedBy");
    // res.status(200).json(myProfile);

    // for viewed users
    // ----------------

    const alreadyViewed = await myProfile?.viewedBy?.find((user) => {
      return user?.id?.toString() === loginUserId;
    });

    // prevent add thierself to viewed
    const selfUserId = (await myProfile?.id) === req?.user?.id;

    if (alreadyViewed || selfUserId) {
      res.status(200).json(myProfile);
    } else {
      const profile = await User.findByIdAndUpdate(myProfile?.id, {
        $push: { viewedBy: loginUserId },
      });
      res.status(200).json(profile);
    }
    // ----------------
  } catch (error) {
    res.status(200).json(error);
  }
});

//update user profile
// ---------------------------------------------------------------------
export const updateUserProfileCtrl = asyncHandler(async (req, res) => {
  const { _id } = req?.user;
  validateMongodbId(_id);
  const user = await User.findByIdAndUpdate(
    _id,
    {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      bio: req.body.bio,
    },
    { new: true, runValidators: true }
  );
  res.status(200).json(user);
});

//update user password
// ---------------------------------------------------------------------
export const updateUserPasswordCtrl = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongodbId(_id);
  const { password } = req.body;
  const user = await User.findById(_id);
  if (password) {
    user.password = password;
    const updatePassword = await user.save();
    res.status(200).json(updatePassword);
  }
  res.status(200).json(user);
});

//following
// ---------------------------------------------------------------------
export const followingUserCtrl = asyncHandler(async (req, res) => {
  const { followId } = req.body;
  const loginUserId = req.user.id;

  const targetUser = await User.findById(followId);

  const alreadyFollowing = targetUser?.followers?.find(
    (user) => user?.toString() === loginUserId.toString()
  );

  if (alreadyFollowing) throw new Error("Yoo have already following this user");
  console.log(alreadyFollowing);

  // finde user want to follow and update followers field
  await User.findByIdAndUpdate(followId, {
    $push: { followers: loginUserId },
    isFollowing: true,
  });

  // update the login user following field
  await User.findByIdAndUpdate(loginUserId, {
    $push: { following: followId },
  });

  res.status(200).json("following successfully");
});

//unfollow
// ---------------------------------------------------------------------
export const unFollowUserCtrl = asyncHandler(async (req, res) => {
  const { unFollowId } = req.body;
  const loginUserId = req.user.id;

  await User.findByIdAndUpdate(
    unFollowId,
    {
      $pull: { followers: loginUserId },
      isFollowing: false,
    },
    { new: true }
  );

  await User.findByIdAndUpdate(
    loginUserId,
    {
      $pull: { following: unFollowId },
    },
    { new: true }
  );

  res.json("You have successfully unfollowed this user");
});

//block user
// ---------------------------------------------------------------------
export const blockUserCtrl = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);

  const user = await User.findByIdAndUpdate(
    id,
    {
      isBlocked: true,
    },
    { new: true }
  );

  res.status(200).json(user);
});

//block user ***********************************************************
export const unBlockUserCtrl = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);

  const user = await User.findByIdAndUpdate(
    id,
    {
      isBlocked: false,
    },
    { new: true }
  );

  res.status(200).json(user);
});

// ---------------------------------------------------------------------
// ACCOUNT VERIFICATIONS
//generate email verification
export const generateVerificationTokenCtrl = asyncHandler(async (req, res) => {
  const loginUserId = req.user.id;
  const user = await User.findById(loginUserId);

  try {
    const verificationToken = await user.createAccountVerificationToken();
    await user.save();

    const resetURL = `If you were requested to verify your account.verify now within 10 minutes, otherwise ignore this message <a href="http://localhost:3000/verify/account/${verificationToken}">Click to verify</a>`;

    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "hussientawhidi710@gmail.com",
        pass: "jxkczlajkxpttgxi",
      },
    });

    await transporter.sendMail({
      from: "hussientawhidi710@gmail.com", // sender address
      to: user?.email, // list of receivers
      // to: "hussientawhidi711@gmail.com", // list of receivers
      subject: "Account Verification", // Subject line
      text: "Hello World", // plain text body
      html: `<h1>${resetURL}</h1>`, // html body
    });

    res.json(verificationToken);
  } catch (error) {
    res.json(error);
  }
});

//account verified and update
export const accountVerificationCtrl = asyncHandler(async (req, res) => {
  const { token } = req.body;
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  //find this user by token
  const userFound = await User.findOne({
    accountVerificationToken: hashedToken,
    accountVerificationTokenExpires: { $gt: new Date() },
  });
  if (!userFound) throw new Error("Token expired, try again later");
  //update the proprt to true
  userFound.isAccountVerified = true;
  userFound.accountVerificationToken = undefined;
  userFound.accountVerificationTokenExpires = undefined;
  await userFound.save();

  res.status(200).json(userFound);
});

//forget password
// ---------------------------------------------------------------------
export const forgetPasswordToken = asyncHandler(async (req, res) => {
  const { email } = req?.body;
  const user = await User.findOne({ email });

  if (!user) throw new Error("email not registered");

  try {
    const token = await user.createPasswordResetToken();
    console.log(token);
    await user.save();

    const resetURL = `If you were requested to reset your password.verify now within 10 minutes, otherwise ignore this message <a href="http://localhost:3000/forget/password/${token}">Click to verify</a>`;

    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "hussientawhidi710@gmail.com",
        pass: "jxkczlajkxpttgxi",
      },
    });

    await transporter.sendMail({
      from: "hussientawhidi710@gmail.com", // sender address
      to: email, // list of receivers
      subject: "Reset Password", // Subject line
      text: "Reset Password", // plain text body
      html: `<p>${resetURL}</p>`, // html body
    });
    res.json({
      msg: `A verification message is successfully sent to ${user?.email}. Reset now whitin 10 minutes`,
    });
  } catch (error) {
    res.status(404).json(error);
  }
});

//Reset password
// ---------------------------------------------------------------------
export const passwordResetToken = asyncHandler(async (req, res) => {
  const { token, password } = req?.body;
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });
  if (!user) throw new Error("token expired try again");

  // update the changes
  user.password = password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;

  await user.save();

  res.status(200).json(user);
});

//profile photo upload
// ---------------------------------------------------------------------
export const profilePhotoUploadCtrl = asyncHandler(async (req, res) => {
  //Find the login user
  const { _id } = req.user;

  //1. Get the oath to img
  const localPath = `public/images/profile/${req.file.filename}`;
  //2.Upload to cloudinary
  const imgUploaded = await cloudinaryUploadImg(localPath);

  const foundUser = await User.findByIdAndUpdate(
    _id,
    {
      profilePhoto: imgUploaded?.url,
    },
    { new: true }
  );

  await foundUser.save();
  //Remove uploaded profile from localStorage
  fs.unlinkSync(localPath);
  res.json(foundUser);
});
