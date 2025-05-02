import { Notification } from "../models/notificationSchema.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import {Project} from "../models/projectSchema.js";
import { User } from "../models/userSchema.js";
import ErrorHandler from "../utils/ErrorHandler.js";

// export const getUserNotifications = catchAsyncErrors(async (req, res, next) => {
//   const notifications = await Notification.find({ user: req.user.email }).sort({ createdAt: -1 });

//   res.status(200).json({
//     success: true,
//     total: notifications.length,
//     notifications,
//   });
// });

export const getUserNotifications = catchAsyncErrors(async (req, res, next) => {
    const userEmail = req.user.email;
  
    const notifications = await Notification.find({ user: userEmail }).sort({ createdAt: -1 });
  
    res.status(200).json({
      success: true,
      total: notifications.length,
      notifications,
    });
  });

  export const respondToProjectInvite = catchAsyncErrors(async (req, res, next) => {
    const { notificationId } = req.params;
    const { action } = req.body; // "accept" or "reject"
    const userEmail = req.user.email;
  
    const notification = await Notification.findById(notificationId);
    if (!notification) return next(new ErrorHandler("Notification not found", 404));
  
    const { projectId } = notification.metadata;
    const project = await Project.findById(projectId);
    if (!project) return next(new ErrorHandler("Project not found", 404));
  
    if (notification.user !== userEmail) {
      return next(new ErrorHandler("Unauthorized", 403));
    }
  
    if (action === "accept") {
      if (!project.coWorkers.includes(userEmail)) {
        project.coWorkers.push(userEmail);
        await project.save();
      }
      await Notification.create({
        user: notification.metadata.senderEmail,
        message: `${userEmail} accepted your invitation for the project "${project.name}".`,
      });
    } else if (action === "reject") {
      await Notification.create({
        user: notification.metadata.senderEmail,
        message: `${userEmail} rejected your invitation for the project "${project.name}".`,
      });
    }
  
    // Delete the processed notification
    await notification.deleteOne();
  
    res.status(200).json({
      success: true,
      message: action === "accept" ? "You have joined the project." : "You have rejected the request.",
    });
  });