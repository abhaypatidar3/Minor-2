import express from "express";
import { createProject, addCoWorker, acceptCoWorker, getProjectDetails, getProjects, getAllProjects, requestToJoinProject, handleJoinRequest, getPendingJoinRequests, getRecommendedProjects, getMyProjects, leaveProject, getMyJoinedProjects, sendProjectRequestToUser, updateproject, getCoworkerProjects} from "../controllers/projectController.js";
import { isAuthenticatedUser } from "../middlewares/auth.js";
import { getUserNotifications} from "../controllers/notificationController.js";


const router = express.Router();

// Route to create a new project
router.post("/create", isAuthenticatedUser, createProject);

// Route to add a co-worker to the project
router.put("/:projectId/add-coworker", isAuthenticatedUser, addCoWorker);

// Route to accept a co-worker into the project
router.put("/:projectId/accept-coworker", isAuthenticatedUser, acceptCoWorker);

router.get("/get_product/:projectId",isAuthenticatedUser,getProjectDetails);
router.get("/get_product",isAuthenticatedUser,getProjects);

router.get("/", isAuthenticatedUser, getAllProjects);

router.post("/request/:projectId", isAuthenticatedUser, requestToJoinProject);

router.post("/handle-request/:projectId", isAuthenticatedUser, handleJoinRequest);
router.get("/pending-requests/:projectId", isAuthenticatedUser, getPendingJoinRequests);

router.get("/my", isAuthenticatedUser, getMyProjects);

router.get("/recommended", isAuthenticatedUser, getRecommendedProjects);
router.put("/:projectId/leave", isAuthenticatedUser, leaveProject);
router.get("/my-projects",isAuthenticatedUser, getMyJoinedProjects);
router.get("/notification", isAuthenticatedUser, getUserNotifications);
router.post("/request-user", isAuthenticatedUser, sendProjectRequestToUser);
router.put("/updateproject/:projectId", isAuthenticatedUser, updateproject);
router.get("/coworker-projects", isAuthenticatedUser, getCoworkerProjects);

export default router;