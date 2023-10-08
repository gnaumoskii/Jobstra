/* eslint-disable no-undef */
import User from "../models/user.js";
import { compareHashedPassword, hashPassword, validateUserData } from "../util/userValidation.js";

import dotenv from "dotenv";
import { generateAccessToken, generateRefreshToken } from "../middleware/cookieJWTAuth.js";
dotenv.config();

export const getAllUsers = async (req,res) => {
    // for admin only
    const users = await User.findAll();
    res.json(users);
};


export const createUser = async (req,res) => {
    const userData = req.body;
    const dataIsValid = validateUserData(userData);
    if(!dataIsValid) {
        return res.status(400).json({message: "Invalid data."});
    }

    const emailExists = await User.findOne({where: {email: userData.email}});
    if(emailExists) {
        return res.status(409).json({message: "Email already exists."});
    }

    const usernameExists = await User.findOne({where: {username: userData.username}});
    if(usernameExists) {
        return res.status(409).json({message: "Username already exists."});
    }

    const hashedPassword = await hashPassword(userData.password);
    const user = await User.create({...userData, password: hashedPassword});
    res.json(user);
}

export const loginUser = async (req,res) => {
    const { email, password } = req.body;
    const user = await User.findOne({where: {email}});

    if(!user) {
        return res.status(401).json({message: "Invalid email or password."});
    }

    const passwordIsCorrect = await compareHashedPassword(password, user.password);
    if(!passwordIsCorrect) {
        return res.status(401).json({message: "Invalid email or password."});
    }
    
    const userTokenData = {id: user.id, email: user.email, username: user.username};
    const accessToken = generateAccessToken(userTokenData);
    const refreshToken = generateRefreshToken(userTokenData);
    res.cookie('access_token', accessToken, {
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 60 * 15), // 15 minutes
    });
    res.cookie('refresh_token', refreshToken, {
        httpOnly: true,
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    });
    res.json({username: user.username});
}

export const logoutUser = (req,res) => {
    res.clearCookie("access_token");
    res.clearCookie("refresh_token");
    res.json({message: "Successfully logged out."});
}