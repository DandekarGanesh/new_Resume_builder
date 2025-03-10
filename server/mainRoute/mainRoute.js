import express from "express";
const router = express.Router();
import userRouter from "../Routes/userRouter.js";

router.use("/user", userRouter);
// router.use("/resume");



export default router;