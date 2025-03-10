import express from "express";
const userRouter = express.Router();
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
           .post(logout);

// get user
userRouter.route("/getUser") 
           .get(getProfile);

// forgot password
userRouter.route("/forgotPassword")
          .post(forgotPassword);

// reset password
userRouter.route("/resetPassword")
          .post(resetPassword);

// change password
userRouter.route("/changePassword")
          .post(changePassword);


// update user
userRouter.route("/updateUser")
          .post(updateUser);


export default userRouter;