import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
});

pool.on("error", (err) => {
  console.error("Error connecting to database", err);
  process.exit(-1);
});

pool.on("connect", () => {
  console.log("Connection pool established with database");
});

export default pool;
