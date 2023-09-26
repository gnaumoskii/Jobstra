import express from "express";
import { createApplication, deleteApplication, editApplication, getAllApplications, getApplication } from "../controllers/application.js";
const router = express.Router();

router.get("/", getAllApplications);
router.get("/:id", getApplication);
router.post("/", createApplication);
router.patch("/:id", editApplication);
router.delete("/:id", deleteApplication);

export default router;