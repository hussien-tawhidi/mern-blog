import express from "express";
import cors from "cors";
import colors from "colors";
import myDB from "./config/myDB.js";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import emailRoutes from "./routes/emailRoutes.js"
import commentRoutes from "./routes/commentRoutes.js";
import { errorHandler, notFound } from "./middleware/errorHandler.js";
import categoryRoutes from "./routes/categoryRoutes.js"
myDB();

const app = express();
app.use(cors());
app.use(express.json());

// routes *************************************************
app.use("/api/users/", userRoutes);
app.use("/api/posts/", postRoutes);
app.use("/api/comment/", commentRoutes);
app.use("/api/comment/", commentRoutes);
// -----------------------------
// email bettween users that they could sent that in to easch other
// -----------------------------
app.use("/api/email", emailRoutes);
app.use("/api/category", categoryRoutes);

// errorhandler must use after router
app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`server has running ... ${port}`);
});

// SG.bdGCMQc0Sn - yDMDpjKJSDA.JmszRlyjdKi_0uXhSsI9_ZCiMAC91Jhp5WhgqffeXVU;
