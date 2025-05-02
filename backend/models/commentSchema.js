import mongoose from "mongoose";

const replySchema = new mongoose.Schema({
    sender: {
      type: String, // email
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });

const commentSchema = new mongoose.Schema({
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
  sender: {
    type: String, // Store user email directly
    required: true,
  },
  message: {
    type: String,
    required: [true, "Message cannot be empty"],
  },
  replies:[replySchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Comment = mongoose.model("Comment", commentSchema);
