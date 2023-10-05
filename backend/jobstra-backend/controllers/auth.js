import jwt from "jsonwebtoken";
import { generateAccessToken } from "../middleware/cookieJWTAuth.js";

export const getAccessToken = async (req, res) => {
    const refreshToken = req.cookies.refresh_token;
    if(!refreshToken) {
        return res.status(401).json({isAuthorized: false, message:"Not authorized."})
    }
    console.log("yo");
    const userTokenData = jwt.decode(refreshToken);
    const accessToken = generateAccessToken(userTokenData);
    res.cookie('access_token', accessToken, {
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 60 * 15), // 15 minutes
    });
    res.json({isAuthorized: true, message: "Generated new access token.", username: userTokenData.username});
}
