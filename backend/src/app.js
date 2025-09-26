import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import connectDB from "./config/db.js";

// Routes
import issueRoutes from "./routes/issueRoutes.js";
import departmentRoutes from "./routes/departmentRoute.js";
import statsRoutes from "./routes/statsRoutes.js";
// import userRoutes from "./routes/userRoutes.js";

dotenv.config();
connectDB();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// CORS configuration
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? ["https://your-frontend-domain.com"]
        : ["http://localhost:5173", "http://localhost:3000"],
    credentials: true,
  })
);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// API Routes
app.use("/api/issues", issueRoutes);
app.use("/api/departments", departmentRoutes);
app.use("/api/stats", statsRoutes);
// app.use("/api/users", userRoutes);

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "Server is running" });
});

// 🚀 Start the server directly from app.js
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
