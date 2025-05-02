import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  user: {
    type: String, // store user email
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  isRead: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String, // e.g., "project-invite"
    default: "general",
  },
  metadata: {
    projectId: String,
    senderEmail: String,
    proposedAmount: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Notification = mongoose.model("Notification", notificationSchema);
