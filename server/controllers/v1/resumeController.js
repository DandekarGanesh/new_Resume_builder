import Resume from '../../models/resumeModel.js'
import User from '../../models/userModel.js';


const createResume = async (req, res) => {
    try {
        // Ensure that the user is authenticated and `user._id` is available
        const userId = req.user.id;
    
        // Get the resume data from the request body
        const { personalInfo, workExperience, education, skills, certifications, projects } = req.body;
    
        // Create a new Resume document
        const newResume = new Resume({
          user: userId,  // Associate the resume with the authenticated user
          personalInfo,  // Personal Info (name, email, phone, etc.)
          workExperience, // Work Experience data
          education,      // Education details
          skills,         // Skills array
          certifications, // Certifications array
          projects,       // Projects array
        });
    
        // Save the new resume in the database
        await newResume.save();
    
        // Find the user and update their `resumes` field with the new resume
        const user = await User.findById(userId);
        user.resumes.push(newResume._id); // Add the new resume's ID to the user's resumes array
    
        // Save the updated user document
        await user.save();
    
        // Return the created resume in the response
        return res.status(201).json({
          success: true,
          message: 'Resume created successfully',
          resume: newResume,
        });
    
      } catch (error) {
        // Handle any errors during the resume creation process
        console.error(error);
        return res.status(500).json({
          success: false,
          message: 'Failed to create resume',
          error: error.message,
        });
      }
}


const editResume = async (req, res) => {
    try {
        // Get the resume ID from the URL parameter and the data from the body
        const { resumeId } = req.params; // Get the resumeId from the URL parameter
        const { personalInfo, workExperience, education, skills, certifications, projects } = req.body;
    
        // Find the resume by ID
        const resume = await Resume.findById(resumeId);
    
        if (!resume) {
          return res.status(404).json({
            success: false,
            message: 'Resume not found',
          });
        }
    
        // Ensure the authenticated user owns the resume
        if (resume.user.toString() !== req.user._id.toString()) {
          return res.status(403).json({
            success: false,
            message: 'You are not authorized to edit this resume',
          });
        }
    
        // Update the resume with the new data
        resume.personalInfo = personalInfo || resume.personalInfo;
        resume.workExperience = workExperience || resume.workExperience;
        resume.education = education || resume.education;
        resume.skills = skills || resume.skills;
        resume.certifications = certifications || resume.certifications;
        resume.projects = projects || resume.projects;
        resume.updatedAt = Date.now(); // Update the `updatedAt` field
    
        // Save the updated resume
        await resume.save();
    
        // Return the updated resume in the response
        return res.status(200).json({
          success: true,
          message: 'Resume updated successfully',
          resume: resume,
        });
      } catch (error) {
        console.error(error);
        return res.status(500).json({
          success: false,
          message: 'Failed to update resume',
          error: error.message,
        });
      }
}


const deleteResume = async (req, res) => {
    try {
        // Get the resumeId from the URL parameter
        const { resumeId } = req.params;
    
        // Find the resume by its ID
        const resume = await Resume.findById(resumeId);
    
        if (!resume) {
          return res.status(404).json({
            success: false,
            message: 'Resume not found',
          });
        }
    
        // Ensure that the authenticated user owns the resume
        if (resume.user.toString() !== req.user._id.toString()) {
          return res.status(403).json({
            success: false,
            message: 'You are not authorized to delete this resume',
          });
        }
    
        // Delete the resume
        await resume.remove();
    
        // Return success response
        return res.status(200).json({
          success: true,
          message: 'Resume deleted successfully',
        });
      } catch (error) {
        console.error(error);
        return res.status(500).json({
          success: false,
          message: 'Failed to delete resume',
          error: error.message,
        });
      }
}


const getResume = async (req, res) => {
    try {
        // Get the resumeId from the URL parameter
        const { resumeId } = req.params;
    
        // Find the resume by its ID
        const resume = await Resume.findById(resumeId).populate('user', 'fullName email'); // Populating the user field to include user details like fullName and email
    
        if (!resume) {
          return res.status(404).json({
            success: false,
            message: 'Resume not found',
          });
        }
    
        // Ensure that the authenticated user owns the resume (optional step)
        if (resume.user.toString() !== req.user._id.toString()) {
          return res.status(403).json({
            success: false,
            message: 'You are not authorized to view this resume',
          });
        }
    
        // Return the resume data in the response
        return res.status(200).json({
          success: true,
          resume: resume,
        });
      } catch (error) {
        console.error(error);
        return res.status(500).json({
          success: false,
          message: 'Failed to retrieve resume',
          error: error.message,
        });
      }
}


export {
    createResume,
    editResume,
    deleteResume,
    getResume
}

