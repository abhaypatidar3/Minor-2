// auth.js (inside middlewares folder)

import { catchAsyncErrors } from "./catchAsyncErrors.js";
import ErrorHandler from "./error.js";
import jwt from "jsonwebtoken";
import { User } from "../models/userSchema.js";

// Middleware to check if the user is authenticated
export const isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return next(new ErrorHandler("Authentication failed. Please login.", 401));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = await User.findById(decoded.id);
        
        if (!req.user) {
            return next(new ErrorHandler("User not found. Please login again.", 401));
        }

        next();
    } catch (error) {
        return next(new ErrorHandler("Invalid or expired token.", 401));
    }
});
