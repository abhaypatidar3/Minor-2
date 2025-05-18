import express from "express";
import { isAuthenticatedUser } from "../middlewares/auth.js";
import { getUserNotifications, respondToProjectInvite } from "../controllers/notificationController.js";
import { Notification } from '../models/notificationSchema.js'; // adjust path as needed


const router = express.Router();

router.get("/notifications", isAuthenticatedUser, getUserNotifications);
router.get("/me", isAuthenticatedUser, getUserNotifications);
router.post("/respond/:notificationId", isAuthenticatedUser, respondToProjectInvite);
router.delete('/:id', async (req, res) => {
  try {
    await Notification.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Notification deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete notification' });
  }
});

export default router;
