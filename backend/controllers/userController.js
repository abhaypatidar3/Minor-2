import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { User } from "../models/userSchema.js";
import { v2 as cloudinary } from "cloudinary";
import { sendToken } from "../utils/jwtToken.js";

export const register = catchAsyncErrors(async (req, res, next) => {
    try {
        const {
            name,
            email,
            phone,
            address,
            password,
            firstSkill,
            secondSkill,
            thirdSkill,
            status,
        } = req.body;

        if (!name || !phone || !address || !password) {
            return next(new ErrorHandler("All fields are required.", 400));
        }

        if (!firstSkill || !secondSkill || !thirdSkill) {
            return next(new ErrorHandler("Please provide your preferred skills.", 400));
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return next(new ErrorHandler("Email is already registered.", 400));
        }

        const userData = {
            name,
            email,
            phone,
            address,
            password,
            skills: {
                firstSkill,
                secondSkill,
                thirdSkill,
            },
            status,
        };

        if (req.files && req.files.resume) {
            const { resume } = req.files;
            if (resume) {
                try {
                    const cloudinaryResponse = await cloudinary.uploader.upload(resume.tempFilePath, {
                        folder: "User_Resume",
                    });

                    if (!cloudinaryResponse || cloudinaryResponse.error) {
                        return next(new ErrorHandler("Failed to upload resume to cloud.", 500));
                    }

                    userData.resume = {
                        public_id: cloudinaryResponse.public_id,
                        url: cloudinaryResponse.secure_url,
                    };
                } catch (error) {
                    return next(new ErrorHandler("Failed to upload resume.", 500));
                }
            }
        }

        const user = await User.create(userData);
        sendToken(user, 201, res, "User Registered.");
    } catch (error) {
        next(error);
    }
});

export const login = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new ErrorHandler("Email and Password are required.", 400));
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        return next(await ErrorHandler("Invalid email or password.", 400));
    }

    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
        return next(await ErrorHandler("Invalid email or password.", 400));
    }

    sendToken(user, 200, res, "User logged in successfully.");
});

export const logout = catchAsyncErrors(async (req, res, next) => {
    res.status(200).cookie("token", "", {
        expires: new Date(Date.now()),
        httpOnly: true,
    }).json({
        success: true,
        message: "Logged out successfully.",
    });
});


// Get logged-in user's profile
export const getMyProfile = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user._id);
  
    res.status(200).json({
      success: true,
      user,
    });
}
);
  
  // Update profile
export const updateProfile = catchAsyncErrors(async (req, res, next) => {
    const { name, email, skills, about, status } = req.body;
  
    const user = await User.findById(req.user._id);
  
    if (!user) {
      return next(new ErrorHandler("User not found.", 404));
    }
  
    if (name) user.name = name;
    if (email) user.email = email;
    if (skills) user.skills = skills;
    if (about) user.about = about;
    if (status) user.status = status;
  
    await user.save();
  
    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user,
    });
});  



export const searchUsersBySkill = async (req, res, next) => {
  const { skill } = req.query;

  if (!skill) {
    return res.status(400).json({ success: false, message: "Skill is required" });
  }

  const regex = new RegExp(skill, "i"); // case-insensitive regex

  const users = await User.find({
    status:"active",
    $or: [
      { "skills.firstSkill": regex },
      { "skills.secondSkill": regex },
      { "skills.thirdSkill": regex },
    ],
  });

  res.status(200).json({
    success: true,
    users,
  });
};



// import {catchAsyncErrors} from "../middlewares/catchAsyncErrors.js";
// import ErrorHandler from "../middlewares/error.js";
// import {User} from "../models/userSchema.js";
// import {v2 as cloudinary} from "cloudinary"
// import { sendToken } from "../utils/jwtToken.js";
// // import {sendToken} from "../utils/jwtToken.js"
// export const register = catchAsyncErrors(async(req,res,next)=>{
//     try{
//         const{
//             name,
//             email ,
//             phone, 
//             address, 
//             password, 
//             role, 
//             firstNiche, 
//             secondNiche, 
//             thirdNiche, 
//             coverletter,
//         } = req.body;
//         if(!name || !phone || !address || !password || !role)
//         {
//             return next(new ErrorHandler("All fields are required. ",400));
//         } 
//         if(role === "Founder" && (!firstNiche || !secondNiche || !thirdNiche))
//         {
//             return next(new ErrorHandler("Please provide your preffered niches. ",400));
//         }
//         if(role === "Co-Worker" && (!firstNiche || !secondNiche || !thirdNiche))
//         {
//             return next(new ErrorHandler("Please provide your preffered niches. ",400));
//         }
//         const existingUser = await User.findOne({email});
//         if(existingUser)
//         {
//             return next(new ErrorHandler("Email is already registered ",400));
//         }
//         const userData = {
//             name,
//             email ,
//             phone, 
//             address, 
//             password, 
//             role, 
//             niches : {
//             firstNiche, 
//             secondNiche, 
//             thirdNiche, 
//             },
//             coverletter,
//         }
//         if(req.files && req.files.resume){
//             const {resume} = req.files;
//             if(resume){
//                 try{
//                     const cloudinaryResponse = await cloudinary.uploader.upload(resume.tempFilePath,
//                         {folder : "User_Resume"}
//                     )
//                     if(!cloudinaryResponse || cloudinaryResponse.error){
//                         return next(new ErrorHandler("Failed to upload resume to cloud.", 500));
//                     };
//                     userData.resume = {
//                         public_id: cloudinaryResponse.public_id,
//                         url: cloudinaryResponse.secure_url
//                     }
//                 }catch (error){
//                     return next(new ErrorHandler("Failedd to upload resume ",500));
//                 }
//             }
//         }
//         const user = await User.create(userData);
//         sendToken(user, 201, res, "User Registered.")
//         // res.status(201).json({
//         //     success:true,
//         //     message: 'User Registered.'
//         // })
//     } catch (error) {
//         next(error);
//     }
// });


// export const login = catchAsyncErrors(async(req, res, next)=>{
//   const {role, email, password} = req.body;
//   if(!role || !email || !password){
//     return next( 
//       new ErrorHandler("Email, Password and role are required. ",400)
//     );
//   }
//   const user = await User.findOne({email}).select("+password");
//   if(!user){
//     return next(await ErrorHandler("invalid email or Password", 400))
//   }
//   const isPasswordMatched = await user.comparePassword(password);
//   if(!isPasswordMatched){
//     return next(await ErrorHandler("invalid email or Password. ", 400))
//   }
//   if(user.role!==role){
//     return next(await ErrorHandler("invalid user role", 400))
//   }
//   sendToken(user, 200, res, "User logged in successfully. ");
// });

// export const logout = catchAsyncErrors(async(req,res,next)=>{
//   res.status(200).cookie("token", "",{
//     expires: new Date(Date.now()),
//     httpOnly: true,
//     //console.log("error here");
//   }).json({
//     success:true,
//     message: "Logged out successfully."
//   })
// })



