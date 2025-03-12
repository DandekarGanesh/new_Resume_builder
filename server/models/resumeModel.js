import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// Define the schema for the Resume
const ResumeSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model
      required: true,
    },
    personalInfo: {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        default: '',
      },
      summary: {
        type: String,
        default: '',
      },
    },
    workExperience: [
      {
        jobTitle: {
          type: String,
          required: true,
        },
        companyName: {
          type: String,
          required: true,
        },
        startDate: {
          type: Date,
          required: true,
        },
        endDate: {
          type: Date,
        },
        responsibilities: {
          type: String,
        },
      },
    ],
    education: [
      {
        degree: {
          type: String,
          required: true,
        },
        institution: {
          type: String,
          required: true,
        },
        startDate: {
          type: Date,
          required: true,
        },
        endDate: {
          type: Date,
        },
        description: {
          type: String,
        },
      },
    ],
    skills: [
      {
        type: String,
        required: true,
      },
    ],
    certifications: [
      {
        title: {
          type: String,
          required: true,
        },
        institution: {
          type: String,
          required: true,
        },
        dateIssued: {
          type: Date,
        },
        description: {
          type: String,
        },
      },
    ],
    projects: [
      {
        title: {
          type: String,
          required: true,
        },
        description: {
          type: String,
        },
        link: {
          type: String,
        },
        technologiesUsed: {
          type: [String],
        },
        startDate: {
          type: Date,
        },
        endDate: {
          type: Date,
        },
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true } // Automatically handles createdAt and updatedAt
);

// Create the model for the Resume schema
const Resume = mongoose.model('Resume', ResumeSchema);

export default Resume;
