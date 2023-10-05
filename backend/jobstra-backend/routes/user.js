import express from "express";
import { createUser, getAllUsers, loginUser, logoutUser } from "../controllers/user.js";

const router = express.Router();


router.get("/", getAllUsers);
router.post("/", createUser);
router.post("/login", loginUser);
router.delete("/logout", logoutUser);


export default router;