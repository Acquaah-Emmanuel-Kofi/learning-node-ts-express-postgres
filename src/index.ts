import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

// Server running
app.listen(port, () => {
  console.log(`Server is listening on port http://localhost:${port}`);
});
