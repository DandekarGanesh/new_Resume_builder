import express from 'express';
const resumeRouter = express.Router();
import { isLoggedIn } from '../middlewares/authMiddleware.js';
import { createResume, editResume, deleteResume, getResume } from '../controllers/v1/resumeController.js';


// Create a new resume
resumeRouter.route('/create')
           .post(isLoggedIn, createResume);


// Edit resume
resumeRouter.route('/edit/:id')
           .post(isLoggedIn, editResume);


// Delete resume
resumeRouter.route('/delete/:id') 
            .delete(isLoggedIn, deleteResume);


// Get resume
resumeRouter.route('/get/:id')
           .get(isLoggedIn, getResume);


export default resumeRouter;