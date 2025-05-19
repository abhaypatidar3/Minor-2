import express from "express";
import {config} from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser";
import {connection} from "./database/connection.js"
import { errorMiddleware } from "./middlewares/error.js";
import fileUpload from "express-fileupload";
import userRouter from "./routes/userRouter.js"
import projectRoutes from "./routes/projectRouter.js";
import notificationRoutes from "./routes/notificationRouter.js"
import commentRoute from "./routes/commentRouter.js";
const app = express();

config({path: "./config/config.env"})

app.use(cors({
    origin: 'https://skillswapz.netlify.app/',
    methods:["GET","POST","PUT","DELETE"],
    credentials:true
})
);

app.use(cookieParser()); //token to access in backend folder
//middlewares to know data is of which type and it also parse to json format
app.use(express.json());
app.use(express.urlencoded({extended:true})); 

app.use(fileUpload({
    useTempFiles:true,
    tempFileDir: "/tmp/",
})
);

app.use("/api/v1/comments", commentRoute);

app.use("/api/v1", notificationRoutes);

app.use("/api/v1/user",userRouter);
app.use("/api/v1/projects", projectRoutes);

connection();
app.use(errorMiddleware);

export default app;



// import express from "express";
// import { config } from "dotenv";
// import cors from "cors";
// import cookieParser from "cookie-parser";
// import { connection } from "./database/connection.js";
// //import isAuthenticated from "../middlewares/auth.js";
// import { errorMiddleware } from "./middlewares/error.js";
// import fileUpload from "express-fileupload";
// import userRouter from "./routes/userRouter.js";
// // import jobsRouter from "./routes/jobsRouter.js";

// const app = express();

// config({ path: "./config/config.env" });

// app.use(
//   cors({
//     origin: [process.env.FRONTEND_URL],
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true, //allow cookie
//   })
// );

// app.use(cookieParser()); //token to access in backend folder
// //middlewares to know data is of which type and it also parse to json format
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.use(
//   fileUpload({
//     useTempFiles: true,
//     tempFileDir: "/tmp/",
//   })
// );

// app.use("/api/v1/user", userRouter);
// // app.use("/api/v1/job", jobsRouter);

// connection();
// app.use(errorMiddleware);
// export default app;
