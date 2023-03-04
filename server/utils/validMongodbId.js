import mongoose from "mongoose";

const validateMongodbId = (id) => {
  const isValid = mongoose.Types.ObjectId.isValid(id);
  if (!isValid) throw new Error("user id iss not valid");
};



export default validateMongodbId;
