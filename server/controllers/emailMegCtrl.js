import asyncHandler from "express-async-handler";
import nodemailer from "nodemailer";
import EmailMsg from "../models/emailMessaging.js";
import Filter from "bad-words";
// -----------------------------
// email bettween users that they could sent that in to easch other
// -----------------------------
export const sendEmailMsgCtrl = asyncHandler(async (req, res) => {
  const { to, subject, message } = req.body;

  // if content has some profine words sent an email
  const emailMessage = subject + "_" + message;
  const filter = new Filter();
  const isProfane = filter.isProfane(emailMessage);
  if (isProfane)
    throw new Error("email sent failed because content profane word");

  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "hussientawhidi710@gmail.com",
        pass: "jxkczlajkxpttgxi",
      },
    });

    await transporter.sendMail({
      from: "hussientawhidi710@gmail.com", // sender address
      to, // list of receivers
      subject, // Subject line
      text: message, // plain text body
      html: `<h1>_nodemailer_</h1>`, // html body
    });

    //   optional (should save a copy of it in to DB)
    await EmailMsg.create({
      sentBy: req?.user._id,
      from: req?.user?._id,
      to,
      message,
      subject,
    });
    res.json("email sent");
  } catch (error) {
    res.json(error);
  }
});
