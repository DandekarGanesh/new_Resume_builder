// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, { useState } from "react";
import 'font-awesome/css/font-awesome.min.css';
import { toast, ToastContainer } from 'react-toastify'
import axiosInstance from '../../../Helpers/axiosInstance';
import { useNavigate } from "react-router-dom";


interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
  summary: string;
}
interface WorkExperience {
  jobTitle: string;
  companyName: string;
  startDate: Date;
  endDate?: Date;
  responsibilities: string;
}
interface Education {
  degree: string;
  institution: string;
  startDate: Date;
  endDate?: Date;
  description: string;
}
interface Certification {
  title: string;
  institution: string;
  dateIssued: Date;
  description: string;
}
interface Project {
  title: string;
  description: string;
  link: string;
  technologiesUsed: string[];
  startDate: Date;
  endDate?: Date;
}
interface ResumeData {
  personalInfo: PersonalInfo;
  workExperience: WorkExperience[];
  education: Education[];
  skills: string[];
  certifications: Certification[];
  projects: Project[];
}
const CreateResume: React.FC = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<ResumeData>({
    personalInfo: {
      name: "",
      email: "",
      phone: "",
      address: "",
      summary: "",
    },
    workExperience: [
      {
        jobTitle: "",
        companyName: "",
        startDate: new Date(),
        responsibilities: "",
      },
    ],
    education: [
      {
        degree: "",
        institution: "",
        startDate: new Date(),
        description: "",
      },
    ],
    skills: [],
    certifications: [
      {
        title: "",
        institution: "",
        dateIssued: new Date(),
        description: "",
      },
    ],
    projects: [
      {
        title: "",
        description: "",
        link: "",
        technologiesUsed: [],
        startDate: new Date(),
      },
    ],
  });
  const handlePersonalInfoChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      personalInfo: {
        ...formData.personalInfo,
        [e.target.name]: e.target.value,
      },
    });
  };
  const handleWorkExperienceChange = (
    index: number,
    field: keyof WorkExperience,
    value: string | Date,
  ) => {
    const newWorkExperience = [...formData.workExperience];
    newWorkExperience[index] = {
      ...newWorkExperience[index],
      [field]: value,
    };
    setFormData({
      ...formData,
      workExperience: newWorkExperience,
    });
  };
  const addWorkExperience = () => {
    setFormData({
      ...formData,
      workExperience: [
        ...formData.workExperience,
        {
          jobTitle: "",
          companyName: "",
          startDate: new Date(),
          responsibilities: "",
        },
      ],
    });
  };
  const removeWorkExperience = (index: number) => {
    const newWorkExperience = formData.workExperience.filter(
      (_, i) => i !== index,
    );
    setFormData({
      ...formData,
      workExperience: newWorkExperience,
    });
  };
  const handleSkillChange = (skill: string) => {
    if (!formData.skills.includes(skill)) {
      setFormData({
        ...formData,
        skills: [...formData.skills, skill],
      });
    }
  };
  const removeSkill = (skill: string) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((s) => s !== skill),
    });
  };
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold mb-6">
              Personal Information
            </h2>
            <div className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.personalInfo.name}
                onChange={handlePersonalInfoChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.personalInfo.email}
                onChange={handlePersonalInfoChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.personalInfo.phone}
                onChange={handlePersonalInfoChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
              <textarea
                name="address"
                placeholder="Address"
                value={formData.personalInfo.address}
                onChange={handlePersonalInfoChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 h-24"
              />
              <textarea
                name="summary"
                placeholder="Professional Summary"
                value={formData.personalInfo.summary}
                onChange={handlePersonalInfoChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 h-32"
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Work Experience</h2>
              <button
                onClick={addWorkExperience}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors cursor-pointer !rounded-button whitespace-nowrap"
              >
                <i className="fa fa-plus mr-2" />
                Add Experience
              </button>
            </div>
            {formData.workExperience.map((exp, index) => (
              <div
                key={index}
                className="p-4 border border-gray-200 rounded-lg space-y-4"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">
                    Experience {index + 1}
                  </h3>
                  <button
                    onClick={() => removeWorkExperience(index)}
                    className="text-red-500 hover:text-red-600 cursor-pointer !rounded-button whitespace-nowrap"
                  >
                    <i className="fa fa-trash" />
                  </button>
                </div>
                <input
                  type="text"
                  placeholder="Job Title"
                  value={exp.jobTitle}
                  onChange={(e) =>
                    handleWorkExperienceChange(
                      index,
                      "jobTitle",
                      e.target.value,
                    )
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
                <input
                  type="text"
                  placeholder="Company Name"
                  value={exp.companyName}
                  onChange={(e) =>
                    handleWorkExperienceChange(
                      index,
                      "companyName",
                      e.target.value,
                    )
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="date"
                    value={exp.startDate.toISOString().split("T")[0]}
                    onChange={(e) =>
                      handleWorkExperienceChange(
                        index,
                        "startDate",
                        new Date(e.target.value),
                      )
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                  <input
                    type="date"
                    value={exp.endDate?.toISOString().split("T")[0]}
                    onChange={(e) =>
                      handleWorkExperienceChange(
                        index,
                        "endDate",
                        new Date(e.target.value),
                      )
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
                <textarea
                  placeholder="Responsibilities"
                  value={exp.responsibilities}
                  onChange={(e) =>
                    handleWorkExperienceChange(
                      index,
                      "responsibilities",
                      e.target.value,
                    )
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 h-32"
                />
              </div>
            ))}
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Education</h2>
              <button
                onClick={() => {
                  setFormData({
                    ...formData,
                    education: [
                      ...formData.education,
                      {
                        degree: "",
                        institution: "",
                        startDate: new Date(),
                        description: "",
                      },
                    ],
                  });
                }}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors cursor-pointer !rounded-button whitespace-nowrap"
              >
                <i className="fa fa-plus mr-2" />
                Add Education
              </button>
            </div>
            {formData.education.map((edu, index) => (
              <div
                key={index}
                className="p-4 border border-gray-200 rounded-lg space-y-4"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Education {index + 1}</h3>
                  <button
                    onClick={() => {
                      const newEducation = formData.education.filter(
                        (_, i) => i !== index,
                      );
                      setFormData({ ...formData, education: newEducation });
                    }}
                    className="text-red-500 hover:text-red-600 cursor-pointer !rounded-button whitespace-nowrap"
                  >
                    <i className="fa fa-trash" />
                  </button>
                </div>
                <input
                  type="text"
                  placeholder="Degree"
                  value={edu.degree}
                  onChange={(e) => {
                    const newEducation = [...formData.education];
                    newEducation[index] = { ...edu, degree: e.target.value };
                    setFormData({ ...formData, education: newEducation });
                  }}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
                <input
                  type="text"
                  placeholder="Institution"
                  value={edu.institution}
                  onChange={(e) => {
                    const newEducation = [...formData.education];
                    newEducation[index] = {
                      ...edu,
                      institution: e.target.value,
                    };
                    setFormData({ ...formData, education: newEducation });
                  }}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="date"
                    value={edu.startDate.toISOString().split("T")[0]}
                    onChange={(e) => {
                      const newEducation = [...formData.education];
                      newEducation[index] = {
                        ...edu,
                        startDate: new Date(e.target.value),
                      };
                      setFormData({ ...formData, education: newEducation });
                    }}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                  <input
                    type="date"
                    value={edu.endDate?.toISOString().split("T")[0]}
                    onChange={(e) => {
                      const newEducation = [...formData.education];
                      newEducation[index] = {
                        ...edu,
                        endDate: new Date(e.target.value),
                      };
                      setFormData({ ...formData, education: newEducation });
                    }}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
                <textarea
                  placeholder="Description"
                  value={edu.description}
                  onChange={(e) => {
                    const newEducation = [...formData.education];
                    newEducation[index] = {
                      ...edu,
                      description: e.target.value,
                    };
                    setFormData({ ...formData, education: newEducation });
                  }}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 h-32"
                />
              </div>
            ))}
          </div>
        );
      case 4:
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Certifications</h2>
              <button
                onClick={() => {
                  setFormData({
                    ...formData,
                    certifications: [
                      ...formData.certifications,
                      {
                        title: "",
                        institution: "",
                        dateIssued: new Date(),
                        description: "",
                      },
                    ],
                  });
                }}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors cursor-pointer !rounded-button whitespace-nowrap"
              >
                <i className="fa fa-plus mr-2" />
                Add Certification
              </button>
            </div>
            {formData.certifications.map((cert, index) => (
              <div
                key={index}
                className="p-4 border border-gray-200 rounded-lg space-y-4"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">
                    Certification {index + 1}
                  </h3>
                  <button
                    onClick={() => {
                      const newCertifications = formData.certifications.filter(
                        (_, i) => i !== index,
                      );
                      setFormData({
                        ...formData,
                        certifications: newCertifications,
                      });
                    }}
                    className="text-red-500 hover:text-red-600 cursor-pointer !rounded-button whitespace-nowrap"
                  >
                    <i className="fa fa-trash" />
                  </button>
                </div>
                <input
                  type="text"
                  placeholder="Certification Title"
                  value={cert.title}
                  onChange={(e) => {
                    const newCertifications = [...formData.certifications];
                    newCertifications[index] = {
                      ...cert,
                      title: e.target.value,
                    };
                    setFormData({
                      ...formData,
                      certifications: newCertifications,
                    });
                  }}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
                <input
                  type="text"
                  placeholder="Issuing Institution"
                  value={cert.institution}
                  onChange={(e) => {
                    const newCertifications = [...formData.certifications];
                    newCertifications[index] = {
                      ...cert,
                      institution: e.target.value,
                    };
                    setFormData({
                      ...formData,
                      certifications: newCertifications,
                    });
                  }}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
                <input
                  type="date"
                  value={cert.dateIssued.toISOString().split("T")[0]}
                  onChange={(e) => {
                    const newCertifications = [...formData.certifications];
                    newCertifications[index] = {
                      ...cert,
                      dateIssued: new Date(e.target.value),
                    };
                    setFormData({
                      ...formData,
                      certifications: newCertifications,
                    });
                  }}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
                <textarea
                  placeholder="Description"
                  value={cert.description}
                  onChange={(e) => {
                    const newCertifications = [...formData.certifications];
                    newCertifications[index] = {
                      ...cert,
                      description: e.target.value,
                    };
                    setFormData({
                      ...formData,
                      certifications: newCertifications,
                    });
                  }}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 h-32"
                />
              </div>
            ))}
          </div>
        );
      case 5:
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Projects</h2>
              <button
                onClick={() => {
                  setFormData({
                    ...formData,
                    projects: [
                      ...formData.projects,
                      {
                        title: "",
                        description: "",
                        link: "",
                        technologiesUsed: [],
                        startDate: new Date(),
                      },
                    ],
                  });
                }}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors cursor-pointer !rounded-button whitespace-nowrap"
              >
                <i className="fa fa-plus mr-2" />
                Add Project
              </button>
            </div>
            {formData.projects.map((project, index) => (
              <div
                key={index}
                className="p-4 border border-gray-200 rounded-lg space-y-4"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Project {index + 1}</h3>
                  <button
                    onClick={() => {
                      const newProjects = formData.projects.filter(
                        (_, i) => i !== index,
                      );
                      setFormData({ ...formData, projects: newProjects });
                    }}
                    className="text-red-500 hover:text-red-600 cursor-pointer !rounded-button whitespace-nowrap"
                  >
                    <i className="fa fa-trash" />
                  </button>
                </div>
                <input
                  type="text"
                  placeholder="Project Title"
                  value={project.title}
                  onChange={(e) => {
                    const newProjects = [...formData.projects];
                    newProjects[index] = { ...project, title: e.target.value };
                    setFormData({ ...formData, projects: newProjects });
                  }}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
                <input
                  type="text"
                  placeholder="Project Link"
                  value={project.link}
                  onChange={(e) => {
                    const newProjects = [...formData.projects];
                    newProjects[index] = { ...project, link: e.target.value };
                    setFormData({ ...formData, projects: newProjects });
                  }}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="date"
                    value={project.startDate.toISOString().split("T")[0]}
                    onChange={(e) => {
                      const newProjects = [...formData.projects];
                      newProjects[index] = {
                        ...project,
                        startDate: new Date(e.target.value),
                      };
                      setFormData({ ...formData, projects: newProjects });
                    }}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                  <input
                    type="date"
                    value={project.endDate?.toISOString().split("T")[0]}
                    onChange={(e) => {
                      const newProjects = [...formData.projects];
                      newProjects[index] = {
                        ...project,
                        endDate: new Date(e.target.value),
                      };
                      setFormData({ ...formData, projects: newProjects });
                    }}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
                <textarea
                  placeholder="Project Description"
                  value={project.description}
                  onChange={(e) => {
                    const newProjects = [...formData.projects];
                    newProjects[index] = {
                      ...project,
                      description: e.target.value,
                    };
                    setFormData({ ...formData, projects: newProjects });
                  }}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 h-32"
                />
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Technologies Used
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {project.technologiesUsed.map((tech, techIndex) => (
                      <div
                        key={techIndex}
                        className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center"
                      >
                        {tech}
                        <button
                          onClick={() => {
                            const newProjects = [...formData.projects];
                            newProjects[index] = {
                              ...project,
                              technologiesUsed: project.technologiesUsed.filter(
                                (_, i) => i !== techIndex,
                              ),
                            };
                            setFormData({ ...formData, projects: newProjects });
                          }}
                          className="ml-2 text-blue-600 hover:text-blue-800 cursor-pointer !rounded-button whitespace-nowrap"
                        >
                          <i className="fa fa-times" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Add a technology"
                      id={`tech-input-${index}`}
                      className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                      onKeyPress={(e) => {
                        if (
                          e.key === "Enter" &&
                          (e.target as HTMLInputElement).value.trim()
                        ) {
                          const newProjects = [...formData.projects];
                          newProjects[index] = {
                            ...project,
                            technologiesUsed: [
                              ...project.technologiesUsed,
                              (e.target as HTMLInputElement).value.trim(),
                            ],
                          };
                          setFormData({ ...formData, projects: newProjects });
                          (e.target as HTMLInputElement).value = "";
                        }
                      }}
                    />
                    <button
                      onClick={() => {
                        const input = document.getElementById(
                          `tech-input-${index}`,
                        ) as HTMLInputElement;
                        if (input.value.trim()) {
                          const newProjects = [...formData.projects];
                          newProjects[index] = {
                            ...project,
                            technologiesUsed: [
                              ...project.technologiesUsed,
                              input.value.trim(),
                            ],
                          };
                          setFormData({ ...formData, projects: newProjects });
                          input.value = "";
                        }
                      }}
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors cursor-pointer !rounded-button whitespace-nowrap"
                    >
                      <i className="fa fa-plus mr-2" />
                      Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
      case 6:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {formData.skills.map((skill, index) => (
                <div
                  key={index}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center"
                >
                  {skill}
                  <button
                    onClick={() => removeSkill(skill)}
                    className="ml-2 text-blue-600 hover:text-blue-800 cursor-pointer !rounded-button whitespace-nowrap"
                  >
                    <i className="fa fa-times" />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add a skill"
                className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleSkillChange((e.target as HTMLInputElement).value);
                    (e.target as HTMLInputElement).value = "";
                  }
                }}
              />
              <button
                onClick={() => {
                  const input = document.querySelector(
                    'input[placeholder="Add a skill"]',
                  ) as HTMLInputElement;
                  handleSkillChange(input.value);
                  input.value = "";
                }}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors cursor-pointer !rounded-button whitespace-nowrap"
              >
                <i className="fa fa-plus mr-2" />
                Add
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

   
  const handleSubmit = async () => {
    console.log("submit is working");
    // Helper function to check required fields for dynamic data
    const checkRequiredFields = (data: any, fields: string[], sectionName: string) => {
      for (const field of fields) {
        if (!data[field]) {
          toast.error(`${sectionName}: ${field} is required.`);
          return false; // Stop if any field is missing
        }
      }
      return true;
    };
  
    // Validate personal info fields
    if (
      !checkRequiredFields(formData.personalInfo, ['name', 'email', 'phone', 'address', 'summary'], 'Personal Information')
    ) return;
  
    // Validate work experience if exists
    if (formData.workExperience.length > 0) {
      for (const work of formData.workExperience) {
        if (
          !checkRequiredFields(work, ['jobTitle', 'companyName', 'startDate', 'responsibilities'], 'Work Experience')
        ) return;
      }
    }
  
    // Validate education if exists
    if (formData.education.length > 0) {
      for (const edu of formData.education) {
        if (
          !checkRequiredFields(edu, ['degree', 'institution', 'startDate', 'description'], 'Education')
        ) return;
      }
    }
  
    // Validate certifications if exists
    if (formData.certifications.length > 0) {
      for (const cert of formData.certifications) {
        if (
          !checkRequiredFields(cert, ['title', 'institution', 'dateIssued', 'description'], 'Certification')
        ) return;
      }
    }
  
    // Validate projects if exists
    if (formData.projects.length > 0) {
      for (const project of formData.projects) {
        if (
          !checkRequiredFields(project, ['title', 'startDate', 'link'], 'Project')
        ) return;
      }
    }
  
    // If all fields are valid, make the API call
    try {
      const response = await axiosInstance.post('/resume/create', formData);
      toast.success('Resume created successfully!');
      console.log('API Response:', response);

      setTimeout(() => {
        navigate('/Home');
      }, 2000);
      
      // Optionally, handle success (e.g., redirect or reset the form)
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Something went wrong!');
      console.error('API Error:', error);
    }
  };
  

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => setShowModal(true)}
          className="mt-20 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors cursor-pointer !rounded-button whitespace-nowrap"
        >
          Create Resume
        </button>
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-8 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center space-x-4">
                  <div className="text-blue-500 font-medium">
                    Step {currentStep} of 6
                  </div>
                  <div className="h-2 w-32 bg-gray-200 rounded-full">
                    <div
                      className="h-full bg-blue-500 rounded-full transition-all duration-300"
                      style={{ width: `${(currentStep / 6) * 100}%` }}
                    />
                  </div>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-500 hover:text-gray-700 cursor-pointer !rounded-button whitespace-nowrap"
                >
                  <i className="fa fa-times text-xl" />
                </button>
              </div>
              {renderStep()}
              <div className="flex justify-between mt-8">
                <button
                  onClick={() => setCurrentStep(currentStep - 1)}
                  disabled={currentStep === 1}
                  className={`px-6 py-2 rounded-lg transition-colors cursor-pointer !rounded-button whitespace-nowrap ${
                    currentStep === 1
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-gray-500 text-white hover:bg-gray-600"
                  }`}
                >
                  <i className="fa fa-arrow-left mr-2" />
                  Previous
                </button>
                <button
                  onClick={() => {
                    if (currentStep < 6) {
                      setCurrentStep(currentStep + 1);
                    } else {
                      // Handle form submission
                      // setShowModal(false);
                      handleSubmit();
                      console.log("i am here");
                    }
                  }}
                  className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors cursor-pointer !rounded-button whitespace-nowrap"
                >
                  {currentStep === 6 ? (
                    <>
                      <i className="fa fa-check mr-2" />
                     <span> Submit </span> 
                    </>
                  ) : (
                    <>
                      Next
                      <i className="fa fa-arrow-right ml-2" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <ToastContainer />
    </div>
  );
};
export default CreateResume;

