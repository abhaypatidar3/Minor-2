import express from "express";
import { getAllUsers, getMyProfile, login, logout, register, searchUsersBySkill, updateProfile, getUserProfileByEmail  } from "../controllers/userController.js"
import { isAuthenticatedUser } from "../middlewares/auth.js";
import { getProjectDetails} from "../controllers/projectController.js";

const router = express.Router();
router.post("/register", register);
router.post("/login", login);
router.get("/logout",isAuthenticatedUser,logout);
router.get("/project/:projectId", isAuthenticatedUser, getProjectDetails);

router.get("/me", isAuthenticatedUser, getMyProfile);

router.put("/me/update", isAuthenticatedUser, updateProfile);
router.get("/search", isAuthenticatedUser, searchUsersBySkill);
router.get("/profile/:email", isAuthenticatedUser, getUserProfileByEmail)

router.get("/all", isAuthenticatedUser, getAllUsers);
export default router;