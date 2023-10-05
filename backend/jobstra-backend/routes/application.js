import express from "express";
import { createApplication, deleteApplication, editApplication, getApplications, getApplication } from "../controllers/application.js";
const router = express.Router();

router.get("/", getApplications);
router.get("/:id", getApplication);
router.post("/", createApplication);
router.patch("/:id", editApplication);
router.delete("/:id", deleteApplication);

export default router;