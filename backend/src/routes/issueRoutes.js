import express from "express";
import {
  getIssues,
  getIssue,
  createIssue,
  updateIssue,
  deleteIssue
} from "../controllers/issueController.js";

const router = express.Router();

// GET /api/issues - Get all issues
router.get("/get", getIssues);

// GET /api/issues/:id - Get single issue
router.get("/:id", getIssue);

// POST /api/issues - Create new issue
router.post("/create", createIssue);

// PUT /api/issues/:id - Update issue
router.put("/:id", updateIssue);

// DELETE /api/issues/:id - Delete issue
router.delete("/:id", deleteIssue);

export default router;
