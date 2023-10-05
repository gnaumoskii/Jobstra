import express from "express";
import { getAccessToken } from "../controllers/auth.js";

const router = express.Router();

router.get("/token", getAccessToken);


export default router;