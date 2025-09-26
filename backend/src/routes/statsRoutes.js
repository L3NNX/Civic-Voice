import express from "express";
import { getStats } from "../controllers/statsController.js";

const router = express.Router();

// GET /api/stats - Dashboard stats
router.get("/", getStats);

export default router;
