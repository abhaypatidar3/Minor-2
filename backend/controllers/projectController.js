import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { Project } from "../models/projectSchema.js";
import { User } from "../models/userSchema.js";
import ErrorHandler from "../middlewares/error.js";
import { Notification } from "../models/notificationSchema.js";

// Create a project
export const createProject = catchAsyncErrors(async (req, res, next) => {
  const { name, description, skillsRequired, projectType, budget } = req.body;

  if (!name || !description || !skillsRequired || !projectType) {
    return next(new ErrorHandler("All fields are required.", 400));
  }

  const projectData = {
    name,
    description,
    founder: req.user._id, // Assign the logged-in user as the founder
    skillsRequired,
    projectType,
    budget: projectType === "paid" ? budget : undefined,
  };

  const project = await Project.create(projectData);

  res.status(201).json({
    success: true,
    project,
  });
});

// Add a co-worker to the project
export const addCoWorker = catchAsyncErrors(async (req, res, next) => {
  const { projectId } = req.params;

  const project = await Project.findById(projectId);

  if (!project) {
    return next(new ErrorHandler("Project not found.", 404));
  }

  // Ensure only the founder can add co-workers
  if (project.founder.toString() !== req.user._id.toString()) {
    return next(new ErrorHandler("Only the project founder can add co-workers.", 403));
  }

  const coWorker = await User.findById(req.body.userId); // User who wants to join

  if (!coWorker) {
    return next(new ErrorHandler("User not found.", 404));
  }

  // Add the user to the co-workers list
  if (!project.coWorkers.includes(coWorker._id)) {
    project.coWorkers.push(coWorker._id);
    await project.save();

    res.status(200).json({
      success: true,
      message: "Co-worker added successfully.",
    });
  } else {
    return next(new ErrorHandler("User is already a co-worker.", 400));
  }
});

// Accept a co-worker into the project (optional)
export const acceptCoWorker = catchAsyncErrors(async (req, res, next) => {
  const { projectId } = req.params;

  const project = await Project.findById(projectId);

  if (!project) {
    return next(new ErrorHandler("Project not found.", 404));
  }

  // Ensure only the founder can accept co-workers
  if (project.founder.toString() !== req.user._id.toString()) {
    return next(new ErrorHandler("Only the project founder can accept co-workers.", 403));
  }

  const coWorker = await User.findById(req.body.userId); // User to be accepted

  if (!coWorker) {
    return next(new ErrorHandler("User not found.", 404));
  }

  // Accept the co-worker into the project
  if (project.coWorkers.includes(coWorker._id)) {
    // Optionally update the status of the project or co-worker role if needed
    res.status(200).json({
      success: true,
      message: "Co-worker accepted.",
    });
  } else {
    return next(new ErrorHandler("User is not a co-worker yet.", 400));
  }
});

// Fetch project details
export const getProjectDetails = catchAsyncErrors(async (req, res, next) => {
  const { projectId } = req.params;   // ✅ Destructure 'id' from params
  console.log(projectId);             // ✅ Now this will log only the ID

  const project = await Project.findById(projectId)
    .populate("founder", "name email skills")
    .populate("coWorkers", "name email skills");

  console.log(project);

  if (!project) {
    return next(new ErrorHandler("Project not found.", 404));
  }

  res.status(200).json({
    success: true,
    project,
  });
});


// Fetch project details
export const getProjects = catchAsyncErrors(async (req, res, next) => {
  const project = await Project.find({});
    console.log(project);

  if (!project) {
    return next(new ErrorHandler("Project not found.", 404));
  }

  res.status(200).json({
    success: true,
    project,
  });
});

export const getAllProjects = catchAsyncErrors(async (req, res, next) => {
  const { skills, status, search, page = 1, limit = 1000, projectType } = req.query;

  const query = {};

  if (projectType) {
    query.projectType = projectType;
  }

  // Escape regex special characters and match any skill
  if (skills) {
    const skillsArray = skills.split(",").map(skill => skill.trim());
    query.skillsRequired = {
      $in: skillsArray.map(skill =>
        new RegExp(`^${escapeRegex(skill)}$`, "i")
      )
    };
  }

  // Filter by status
  if (status) {
    query.status = status;
  }

  // Case-insensitive search in name or description
  if (search) {
    query.$or = [
      { name: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } }
    ];
  }

  const skip = (parseInt(page) - 1) * parseInt(limit);
  const total = await Project.countDocuments(query);

  const projects = await Project.find(query)
    .populate("founder", "name email skills")
    .populate("coWorkers", "name email skills")
    .skip(skip)
    .limit(parseInt(limit));

  res.status(200).json({
    success: true,
    total,
    page: parseInt(page),
    limit: parseInt(limit),
    totalPages: Math.ceil(total / limit),
    projects,
  });
});

// Helper function to escape regex special characters
function escapeRegex(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}






export const requestToJoinProject = catchAsyncErrors(async (req, res, next) => {
  const { projectId } = req.params;
  const project = await Project.findById(projectId).populate("founder", "email");

  if (!project) return next(new ErrorHandler("Project not found", 404));

  const userEmail = req.user.email;

  // Prevent multiple requests
  if (
    project.pendingCoWorkers.includes(userEmail) ||
    project.coWorkers.includes(userEmail)
  ) {
    return next(new ErrorHandler("You have already requested to join or are a co-worker", 400));
  }

  await Notification.create({
  user: project.founder.email,
  message: `${req.user.email} has requested to join your project "${project.name}".`,
  metadata: {
    projectId: project._id,
    senderEmail: req.user.email,
    userName: req.user.name, 
    skills: req.user.skills, 
    message: req.body.customMessage || null,
  },
});

  // Determine message based on project type
  let message;
  if (project.projectType === "paid") {
    message = `Join request sent. This is a paid project with budget ₹${project.budget || 0}.`;
  } else {
    message = `Join request sent. This is an exchange project. You may be expected to collaborate with your skills.`;
  }

  // Add user email to pending list
  project.pendingCoWorkers.push(userEmail);
  await project.save();

  res.status(200).json({
    success: true,
    message,
  });
});



export const handleJoinRequest = catchAsyncErrors(async (req, res, next) => {
  const { projectId } = req.params;
  const { userId, action } = req.body; // userId is the email now

  const project = await Project.findById(projectId);

  if (!project) {
    return next(new ErrorHandler("Project not found.", 404));
  }

  if (project.founder.toString() !== req.user._id.toString()) {
    return next(new ErrorHandler("Only founder can handle join requests.", 403));
  }

  const pending = project.pendingCoWorkers || [];

  if (!pending.includes(userId)) {
    return next(new ErrorHandler("No such join request found.", 404));
  }

  if (action === "accept") {
    project.coWorkers = project.coWorkers || [];

    if (!project.coWorkers.includes(userId)) {
      project.coWorkers.push(userId);
    }
  }
  await Notification.create({
    user: userId, // assuming you're passing email from frontend
    message: `You have been accepted into the project "${project.name}".`,
  });  

  project.pendingCoWorkers = pending.filter(email => email !== userId);

  await project.save();

  res.status(200).json({
    success: true,
    message: action === "accept"
      ? "User accepted as co-worker."
      : "Join request rejected.",
  });
});

export const updateproject = catchAsyncErrors(async(req, res, next)=>{
  const {projectId} = req.params;
  const {name, status, projectType} = req.body;
  const project = await Project.findById(projectId);
  if(!project){
    return next(new ErrorHandler("no project found", 404));
  }
  if(name) project.name = name;
  if(status) project.status = status;
  if(projectType) project.projectType = projectType;
  await project.save();
  res.status(200).json({
    success : true,
    message : "project updated successfully",
    project,
  });
});

export const getPendingJoinRequests = catchAsyncErrors(async (req, res, next) => {
  const { projectId } = req.params;

  const project = await Project.findById(projectId);

  if (!project) {
    return next(new ErrorHandler("Project not found", 404));
  }

  if (project.founder.toString() !== req.user._id.toString()) {
    return next(new ErrorHandler("Only the founder can view requests", 403));
  }

  const pendingRequests = project.pendingCoWorkers || [];

  res.status(200).json({
    success: true,
    pendingRequests,
  });
});

export const getRecommendedProjects = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  const skillsArray = Object.values(user.skills).map(skill =>
    new RegExp(`^${escapeRegex(skill)}$`, "i")
  );

  const projects = await Project.find({
    skillsRequired: { $in: skillsArray },
    founder: { $ne: user._id },
    coWorkers: { $ne: user._id },
  })
    .populate("founder", "name email skills")
    .populate("coWorkers", "name email skills");

  res.status(200).json({
    success: true,
    count: projects.length,
    projects,
  });
});

export const getMyProjects = catchAsyncErrors(async (req, res, next) => {
  const myProjects = await Project.find({
    $or: [
      { founder: req.user._id },
      { coWorkers: req.user._id }
    ]
  })
    .populate("founder", "name email skills")
    .populate("coWorkers", "name email skills");

  res.status(200).json({
    success: true,
    count: myProjects.length,
    myProjects,
  });
});

export const leaveProject = catchAsyncErrors(async (req, res, next) => {
  const { projectId } = req.params;
  const userEmail = req.user.email;

  const project = await Project.findById(projectId);

  if (!project) {
    return next(new ErrorHandler("Project not found", 404));
  }

  // Check if the user is a co-worker
  if (!project.coWorkers.includes(userEmail)) {
    return next(new ErrorHandler("You are not a co-worker in this project", 400));
  }

  // Remove the user from coWorkers
  project.coWorkers = project.coWorkers.filter(email => email !== userEmail);

  await project.save();

  res.status(200).json({
    success: true,
    message: "You have successfully left the project.",
  });
});

export const getMyJoinedProjects = catchAsyncErrors(async (req, res, next) => {
  const userEmail = req.user.email;

  const projects = await Project.find({ coWorkers: userEmail })
    .populate("founder", "name email skills");

  res.status(200).json({
    success: true,
    total: projects.length,
    projects,
  });
});

// export const getUserNotifications = catchAsyncErrors(async (req, res, next) => {
//   const notifications = await Notification.find({ user: req.user.email }).sort({ createdAt: -1 });

//   res.status(200).json({
//     success: true,
//     total: notifications.length,
//     notifications,
//   });
// });

export const sendProjectRequestToUser = catchAsyncErrors(async (req, res, next) => {
  // const { projectId } = req.params;
  const { userEmail, proposedAmount, projectName, description  } = req.body;

  if(userEmail.toString() === req.user.email.toString()){
    return next(new ErrorHandler("you can not send request to yourself"));
  }

  // const project = await Project.findById(projectId).populate("founder");
  // if (!project) return next(new ErrorHandler("Project not found", 404));

  const recipientUser = await User.findOne({ email: userEmail });
  if (!recipientUser) return next(new ErrorHandler("User not found", 404));

  // if (project.founder._id.toString() !== req.user._id.toString()) {
  //   return next(new ErrorHandler("Only the founder can send requests", 403));
  // }

  // let message = `${project.founder.name} (${project.founder.email}) has invited you to join the project "${project.name}".\n\n`;
  let message = `${req.user.name} has invited you to join the project "${projectName}".\n\n`;
  if(proposedAmount){
    message += `Description: ${description}\nProject Type: paid`;
    message += `\nProposed Payment: ₹${proposedAmount || 0}`;
  }
  else if(!proposedAmount){
    message += `Description: ${description}\nProject Type: exchange`;
  }

  await Notification.create({
    user: userEmail, // recipient
    message: `${req.user.name} invited you to join the project ${projectName}`,
    type: "project-invite",
    metadata: {
      senderEmail: req.user.email,
      proposedAmount: proposedAmount, // if it's paid
    },
  });

  res.status(200).json({
    success: true,
    message: "Project request sent with proposed amount.",
  });
});