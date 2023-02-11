import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose.set("strictQuery", false);
const myDB = () => {
  mongoose
    .connect(process.env.myDB)
    .then(() => {
      console.log("DB connected successfully ".blue);
    })
    .catch((err) => {
      console.log(`DB connection failed ${err}`.red);
    });
};
export default myDB;
