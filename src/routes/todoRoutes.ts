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

todoRoutes.post(
  "/todos",
  async (req: Request, res: Response): Promise<void> => {
    const { title, completed } = req.body;

    // TypeScript type-based input validation
    if (typeof title !== "string" || title.trim() === "") {
      res.status(400).json({ error: "Invalid title data" });
      return;
    }

    try {
      const result = await pool.query(
        "INSERT INTO todos (title) VALUES ($1) RETURNING *",
        [title]
      );
      const createdTodo: Todo = result.rows[0];
      res.status(201).json(createdTodo);
    } catch (error) {
      console.error("Error adding todo", error);
      res.status(500).json({ error: "Error adding todo" });
    }
  }
);

export default todoRoutes;
