import express from "express";
const userRouter = express.Router();

// register user
userRouter.route("/register")
           .post(registerUser);

// login user
userRouter.route("/login")
           .post(loginUser);

// logout user
userRouter.route("/logout")
           .post(logoutUser);

// get user
userRouter.route("/getUser") 
           .get(getUser);

// forgot password
userRouter.route("");