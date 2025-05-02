import mongoose from "mongoose";
import { Project } from "../models/projectSchema.js"; 
import { User } from "../models/userSchema.js";

const runMigration = async () => {
  await mongoose.connect("mongodb://localhost:27017/your_db_name"); // ✅ Replace with your DB URI

  const projects = await Project.find({});

  for (const project of projects) {
    // Convert coWorkers
    const coWorkerEmails = [];
    for (const userId of project.coWorkers || []) {
      const user = await User.findById(userId);
      if (user) coWorkerEmails.push(user.email);
    }
    project.coWorkers = coWorkerEmails;

    // Convert pendingCoWorkers
    const pendingEmails = [];
    for (const userId of project.pendingCoWorkers || []) {
      const user = await User.findById(userId);
      if (user) pendingEmails.push(user.email);
    }
    project.pendingCoWorkers = pendingEmails;

    await project.save();
    console.log(`Updated project: ${project._id}`);
  }

  console.log("✅ Migration completed.");
  mongoose.disconnect();
};

runMigration().catch((err) => {
  console.error("❌ Migration failed:", err);
  mongoose.disconnect();
});
