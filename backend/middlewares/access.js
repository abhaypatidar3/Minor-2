import { Project } from "../models/projectSchema.js";
import ErrorHandler from "../utils/ErrorHandler.js";

export const isProjectMemberOrFounder = async (req, res, next) => {
  const { projectId } = req.params;
  const project = await Project.findById(projectId);

  if (!project) return next(new ErrorHandler("Project not found", 404));

  const email = req.user.email;

  if (
    project.founder.toString() !== req.user._id.toString() &&
    !project.coWorkers.includes(email)
  ) {
    return next(new ErrorHandler("Access denied", 403));
  }

  next();
};
