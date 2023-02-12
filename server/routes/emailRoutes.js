import express from "express";
import { sendEmailMsgCtrl } from "../controllers/emailMegCtrl.js";
import authMiddleware from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/",authMiddleware, sendEmailMsgCtrl);


export default router;
