import express from "express";
const userRouter = express.Router();
import { isLoggedIn } from "../middlewares/authMiddleware.js";
import {login,
    logout,
    register,
    updateUser,
    getProfile,
    resetPassword,
    forgotPassword,
    changePassword} from "../controllers/v1/userController.js";

    
// register user
userRouter.route("/register")
           .post(register);

// login user
userRouter.route("/login")
           .post(login);

// logout user
userRouter.route("/logout")
           .post(isLoggedIn, logout);

// get user
userRouter.route("/getUser") 
           .get(isLoggedIn, getProfile);

// forgot password
userRouter.route("/forgotPassword")
          .post(forgotPassword);

// reset password
userRouter.route("/resetPassword/:resetToken")
          .post(resetPassword);

// change password
userRouter.route("/changePassword")
          .post(isLoggedIn, changePassword);


// update user
userRouter.route("/updateUser")
          .post(isLoggedIn, updateUser);


export default userRouter;