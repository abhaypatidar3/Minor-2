import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  founder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  coWorkers: [
    {
      type: String, // storing email instead of ObjectId
    },
  ],
  skillsRequired: [String], // For the skills that are required for the project
  status: {
    type: String,
    enum: ["open", "in-progress", "completed"],
    default: "open",
  },

  // requests: [   // 🆕 Added this field
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "User",
  //   }
  // ],

  pendingCoWorkers: [
    {
      type: String, // storing email instead of ObjectId
    },
  ],

  projectType: {
    type: String,
    enum: ["exchange", "paid"],
    required: true,
  },
  
  budget: {
    type: Number,
    required: function () {
      return this.projectType === "paid";
    },
  },
  

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Project = mongoose.model("Project", projectSchema);
