import express from "express";
const router = express.Router();
import userRouter from "../Routes/userRouter.js";
import resumeRouter from "../Routes/resumeRouter.js";

router.use("/user", userRouter);
router.use("/resume", resumeRouter);



export default router;