import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import pool from "./config/db";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Middlewares
app.use(express.json());
app.use(cors());

// Routes

// Test POSTGRES Connection
app.get("/", async (req, res) => {
  const result = await pool.query("SELECT current_database();");
  res.send(`Connected to ${result.rows[0].current_database}`);
});

// Server running
app.listen(port, () => {
  console.log(`Server is listening on port http://localhost:${port}`);
});
