/* eslint-disable no-undef */
import jwt from "jsonwebtoken";
import dotenv  from "dotenv"
import User from "../models/user.js";
dotenv.config();


export const authenticateToken = async (req,res,next) => {
    let accessToken = req.cookies.access_token;
    let refreshToken = req.cookies.refresh_token;
    try {
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        const userData = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
        const user = await User.findByPk(userData.id);
        req.user = user;
        next();
    } catch (error) {
        res.clearCookie("access_token");
        res.status(401).json({message: "Please log in."});
    }
}

export const generateAccessToken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
}

export const generateRefreshToken = (user) => {
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {expiresIn: "7d"});
}