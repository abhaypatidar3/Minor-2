import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: [3, "Name must contain at least 3 characters"],
        maxlength: [30, "Name can contain at most 30 characters"],
    },
    email: {
        type: String,
        required: true,
        validate: [validator.isEmail, "Please provide a valid email."],
    },
    phone: {
        type: Number,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    skills: { // Changed niches to skills
        firstSkill: String,
        secondSkill: String,
        thirdSkill: String,
    },
    password: {
        type: String,
        required: true,
        minlength: [8, "Password must contain at least 8 characters"],
        maxlength: [32, "Password must contain less than 32 characters"],
        select: false,
    },
    resume: {
        public_id: String,
        url: String,
    },
    coverLetter: {
        type: String,
    },
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "active",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};

export const User = mongoose.model("User", userSchema);
