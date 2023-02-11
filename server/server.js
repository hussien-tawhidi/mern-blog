import express from "express";
import cors from "cors";
import colors from "colors";
import myDB from "./config/myDB.js";
import userRoutes from "./routes/userRoutes.js";
import { errorHandler, notFound } from "./middleware/errorHandler.js";


myDB();

const app = express();
app.use(cors());
app.use(express.json())

// routes *************************************************
app.use("/api/users/",userRoutes)

// errorhandler must use after router
app.use(notFound)
app.use(errorHandler)

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`server has running ... ${port}`);
});


// SG.bdGCMQc0Sn - yDMDpjKJSDA.JmszRlyjdKi_0uXhSsI9_ZCiMAC91Jhp5WhgqffeXVU;