import mongoose from "mongoose";
import mogoose from "mongoose";

const emailMsgSchema = new mogoose.Schema({
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  sentBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  isFlaged: {
    type: Boolean,
    default: false,
  },
}, {
    timestamps:true
});

const EmailMsg = mongoose.model("EmailMsg", emailMsgSchema);
export default EmailMsg