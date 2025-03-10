import User from "../../models/userModel.js"
import AppError from "../../utils/error.util.js";
import  validator from 'email-validator';
import cloudinary from 'cloudinary';
import fs from 'fs/promises';
import sendEmail from '../../utils/sendEmail.js';
import crypto from 'crypto';

const cookieOptions = {
    maxAge: 7 * 24 * 60 * 60 * 1000, // cookie set for 7 days
    httpOnly: true,
    // secure: process.env.NODE_ENV === 'production',
    secure: true,
    sameSite: 'None'
}



const register = async (req, res, next) => {

    try {

        const { fullName, password, email } = req.body;

        if( !fullName || !password || !email) {
            return next(new AppError('All fields are required', 400));
        }
    
        if(!validator.validate(email)) {
            return next(new AppError('Enter a valid Email', 400));   
        }
    
        const userExist = await User.findOne({ email });
    
        if(userExist) {
            return next(new AppError('Email already Exist !!', 400));
        }
    
    
        const user = await User.create({
            fullName,
            email,
            password,
        });
        
        if(!user) {
            return next(new AppError('User registration fail, please try again', 400));
        }
    
        

        await user.save();
        user.password = undefined;
    
        // login after register
        const token = await user.generateJWTToken();
        res.cookie('token', token, cookieOptions);
    
        
        res.status(201)
           .json({
            success: true,
            message: 'User registered successfully',
            user,
        });

    } catch(err) {
        res.status(500)
            .json({
                success: false,
                message: err.message
            });
    }

}




const login = async (req,res, next) => {

    try {
        const { email, password } = req.body;
    
        if(!email || !password ) {
            return next(new AppError('All fields are required', 400));
        }
    
        const user = await User.findOne({ 
            email
        }).select('+password');


        if(!user || !(await user.comparePassword(password))) {
           return next(new AppError('Email or password does not match', 400));
        }
        

        const token = await user.generateJWTToken();
        user.password = undefined;
    
        res.cookie('token', token, cookieOptions);
    
        res.status(200)
           .json({
            success: true,
            message: 'user login successfully',
            user
        });

    } catch(err) {
        res.status(500)
           .json({
            success: false,
            message: err.message,
            error: err
        });
    }

}




const logout = (req,res) => {

    try {

        res.cookie('token', null, {
            secure: true,
            maxAge: 0,
            httpOnly: true
        });
    
        res.status(200)
           .json({
            success: true,
            message: 'User logged out successfully'
        });

    } catch(err) {

        res.status(500)
           .json({
            success: false,
            message: err.message,
            error: err
        });
    }
   
}



const getProfile = async (req,res, next) => {

    try {
        const userId = req.user.id;
        const user = await User.findById(userId);
    
        res.status(200)
           .json({
            success: true,
            message: 'User details',
            user
        });

    } catch(err) {
        
        res.status(500)
            .json({
                success: false,
                message: err.message
            });
    }
}




const forgotPassword = async (req, res, next) => {

    try {

        const { email } = req.body;

        if(!email) {
            return next(new AppError('Email is required', 400));
        }
    
        if(!validator.validate(email)) {
            return next(new AppError('Enter a valid Email', 400));   
        }
    
        const user = await User.findOne({ email });
    
        if(!user) {
            return next(new AppError('Email not registered', 400));
        }
    
        const resetToken = await user.generatePasswordResetToken();
        await user.save();
        
        const resetPasswordUrl = `${process.env.FRONTEND_URL}/reset/${resetToken}`;
    
        // sendEmail
        const sub = "Reset Password";
        const message = `reset your password ...... ${process.env.FRONTEND_URL}/reset?resetToken=${resetToken}`;

        await sendEmail(email, sub, message);

        res.status(200)
           .json({
            success: true,
            message: `Reset Password token has been send to ${email}`,
        });

    } catch(err) {
        
        user.forgotPassword = undefined;
        user.forgotPassword = undefined;
        
        await user.save();
        res.status(500)
            .json({
                success: false,
                message: err.message,
            });
    }
    
}





const resetPassword = async (req, res, next) => {

    try {

        const { resetToken } = req.params;
        const { password } = req.body;
    
        if(!resetToken || !password) {
            return next(new AppError('resetToken and password required', 400));
        }
    
        const forgotPasswordToken = crypto
            .createHash('sha256')
            .update(resetToken)
            .digest('hex');
    
    
        const user = await User.findOne({
            forgotPasswordToken,
            forgotPasswordExpiry: { $gt: Date.now() }
        });
    
    
        
    
        if(!user) {
            return next(new AppError('token is invalid or expire, please try again', 400));
        }
    
    
        
    
        user.password = password;
        user.forgotPasswordToken = undefined;
        user.forgotPasswordExpiry = undefined;
        user.save();
    
        res.status(200)
           .json({
            success: true,
            message: 'Password changed successfully!'
        });

    } catch(err) {
        res.status(500)
            .json({
                success: true,
                message: err.message
            });
    }
   
}



const changePassword = async (req,res, next) => {
    try {

        const { oldPassword, newPassword } = req.body;
        const { id } = req.user;
    
        if(!oldPassword || !newPassword) {
            return next(new AppError('All fields are mandatory', 400));
        }
    
    
        const user = await User.findById(id).select('+password');
    
        if(!user) {
            return next(new AppError('user does not exist', 400));
        }
    
        const isPasswordValid = await user.comparePassword(oldPassword);
    
        if(!isPasswordValid) {
            return next(new AppError('Old password does not match', 400));
        }
    
        user.password = newPassword;
        await user.save();
    
        user.password = undefined;
    
        res.status(200)
           .json({
            success: true,
            message: 'password changed successfully'
        });

    } catch(err) {
        res.status(500)
            .json({
                success: true,
                message: err.message
            });
    }

}




const updateUser = async (req, res, next) => {
    try {

    const { fullName } = req.body;
    const { id } = req.user;

    const user = await User.findById(id);

    if(!user) {
        return next(new AppError('User does not exist', 400));
    }

    if(fullName) {
        user.fullName = fullName;
    }

    await user.save();  

    res.status(200)
        .json({
            success: true,
            message: 'User details updated successfully!'
        });

    } catch(err) {
        res.status(500)
            .json({
                success: false,
                message: err.message
            });
    }

}




export {
    login,
    logout,
    register,
    updateUser,
    getProfile,
    resetPassword,
    forgotPassword,
    changePassword
}