import dotenv from "dotenv";
import express from "express";
import cors from "cors";

import { sequelize } from "./config/db.js";
import authRoutes from "./routes/routes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => res.send("Welcome to the Auth API!"));

// Start server
sequelize.sync().then(() => {
    app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
});
