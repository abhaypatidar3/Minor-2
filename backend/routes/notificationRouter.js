import express from "express";
import { isAuthenticatedUser } from "../middlewares/auth.js";
import { getUserNotifications, respondToProjectInvite } from "../controllers/notificationController.js";

const router = express.Router();

router.get("/notifications", isAuthenticatedUser, getUserNotifications);
router.get("/me", isAuthenticatedUser, getUserNotifications);
router.post("/respond/:notificationId", isAuthenticatedUser, respondToProjectInvite);
export default router;
