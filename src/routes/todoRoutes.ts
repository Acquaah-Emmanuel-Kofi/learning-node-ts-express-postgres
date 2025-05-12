import { Router, Request, Response } from "express";
import pool from "../config/db";

const todoRoutes = Router();

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

todoRoutes.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the To-Do List App!");
});

todoRoutes.get("/todos", async (req: Request, res: Response) => {
  try {
    const result = await pool.query("SELECT * FROM todos");
    const todos: Todo[] = result.rows;
    res.json(todos);
  } catch (error) {
    console.error("Error fetching todos", error);
    res.status(500).json({ error: "Error fetching todos" });
  }
});

export default todoRoutes;
