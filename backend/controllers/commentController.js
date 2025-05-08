import { Comment } from "../models/commentSchema.js";
import { Project } from "../models/projectSchema.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";

// POST comment
export const postComment = catchAsyncErrors(async (req, res, next) => {
  const { projectId } = req.params;
  const { message } = req.body;

  const project = await Project.findById(projectId);
  if (!project) return next(new ErrorHandler("Project not found", 404));

  const comment = await Comment.create({
    project: projectId,
    sender: req.user.email,
    message,
  });

  res.status(201).json({
    success: true,
    comment,
  });
});

export const addReplyToComment = catchAsyncErrors(async (req, res, next) => {
  const { commentId } = req.params;
  const { message } = req.body;
  const sender = req.user.email;

  const comment = await Comment.findById(commentId).populate("project");
  if (!comment) return next(new ErrorHandler("Comment not found", 404));

  const project = comment.project;

  if (
    project.founder.toString() !== req.user._id.toString() &&
    !project.coWorkers.includes(sender)
  ) {
    return next(new ErrorHandler("Access denied", 403));
  }

  comment.replies.push({
    sender,
    message,
  });

  await comment.save();

  res.status(200).json({
    success: true,
    message: "Reply added successfully",
    comment,
  });
});
  

// GET all comments for a project
export const getProjectComments = catchAsyncErrors(async (req, res, next) => {
  const { projectId } = req.params;

  const comments = await Comment.find({ project: projectId }).sort({ createdAt: 1 });

  res.status(200).json({
    success: true,
    comments,
  });
});
