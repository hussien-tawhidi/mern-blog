import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import dotenv from "dotenv";

dotenv.config();

const authMiddleware = asyncHandler(async (req, res, next) => {
  let token;
  if (req?.headers?.authorization?.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      if (token) {
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        const user = await User.findById(decoded?.id).select("-password");
        req.user = user;
        next();
      }
    } catch (error) {
      throw new Error("not authorized , try login again");
    }
  } else {
    throw new Error("not token found");
  }
  //   const authHeader = req.headers.token;
  //   if (authHeader) {
  //     const token = authHeader.split(" ")[1];

  //     jwt.verify(token, process.env.JWT_KEY, (err, user) => {
  //       if (err) res.status(403).json("Token is not valid!");
  //       req.user = user;
  //       next();
  //     });
  //   } else {
  //     return res.status(401).json("You are not authenticated!");
  //   }
});

export default authMiddleware;
