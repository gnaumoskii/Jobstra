/* eslint-disable no-undef */
import User from "../models/user.js";
import { compareHashedPassword, hashPassword } from "../util/userValidation.js";

import dotenv from "dotenv";
import { generateAccessToken, generateRefreshToken } from "../middleware/cookieJWTAuth.js";
dotenv.config();

export const getAllUsers = async (req,res) => {
    const users = await User.findAll();
    res.json(users);
};


export const createUser = async (req,res) => {
    const userData = req.body;
    // second validation on the user object
    const hashedPassword = await hashPassword(userData.password);
    const user = await User.create({...userData, password: hashedPassword});
    res.json(user);
}

export const loginUser = async (req,res) => {
    const { email, password } = req.body;
    console.log(email, password);

    const user = await User.findOne({where: {email}});

    if(!user) {
        return res.status(401).json({isAuthenticated: false,message: "Invalid credentials."});
    }

    const passwordIsCorrect = await compareHashedPassword(password, user.password);
    if(passwordIsCorrect) {
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
        return res.json({isAuthenticated: true, message: "Successfully logged in!", username: user.username});
    }
    res.status(401).json({isAuthenticated: false,message: "Invalid credentials."});
}

export const logoutUser = (req,res) => {
    res.clearCookie("access_token");
    res.clearCookie("refresh_token");
    res.json({isAuthenticated: false,message: "Successfully logged out."});
}