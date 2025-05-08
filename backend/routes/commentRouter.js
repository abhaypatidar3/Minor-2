import express from "express";
import { isAuthenticatedUser } from "../middlewares/auth.js";
import {
  postComment,
  getProjectComments,
  addReplyToComment,
} from "../controllers/commentController.js";
import { isProjectMemberOrFounder } from "../middlewares/access.js";

const router = express.Router();

router.post("/:projectId", isAuthenticatedUser,isProjectMemberOrFounder, postComment);
// router.post("/:projectId", isAuthenticatedUser, postComment);
router.get("/:projectId", isAuthenticatedUser,isProjectMemberOrFounder, getProjectComments);

router.post("/:commentId/reply", isAuthenticatedUser, addReplyToComment);

// router.post("/:projectId", isAuthenticatedUser, isProjectMemberOrFounder, postComment);

export default router;
