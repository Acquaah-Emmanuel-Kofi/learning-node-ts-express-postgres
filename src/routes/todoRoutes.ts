import { Router, Request, Response } from "express";
import pool from "../config/db";
import { Todo, TodoBody } from "../models/todos.model";

const todoRoutes = Router();

todoRoutes.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the To-Do List App!");
});

// GET all todos
todoRoutes.get("/todos", async (req: Request, res: Response<Todo[]>) => {
  try {
    const result = await pool.query("SELECT * FROM todos");
    const todos: Todo[] = result.rows;
    res.json(todos);
  } catch (error) {
    console.error("Error fetching todos", error);
    res.status(500).json({ error: "Error fetching todos" } as any);
  }
});

// POST a new todo
todoRoutes.post(
  "/todos",
  async (
    req: Request<{}, {}, TodoBody>,
    res: Response<Todo | { error: string }>
  ) => {
    const { title, completed } = req.body;

    if (typeof title !== "string" || title.trim() === "") {
      res.status(400).json({ error: "Invalid title data" });
      return;
    }

    try {
      const result = await pool.query(
        "INSERT INTO todos (title, completed) VALUES ($1, $2) RETURNING *",
        [title, completed ?? false]
      );
      const createdTodo: Todo = result.rows[0];
      res.status(201).json(createdTodo);
    } catch (error) {
      console.error("Error adding todo", error);
      res.status(500).json({ error: "Error adding todo" });
    }
  }
);

// DELETE a todo
todoRoutes.delete(
  "/todos/:id",
  async (req: Request<{ id: string }>, res: Response<{ error?: string }>) => {
    const todoID = parseInt(req.params.id, 10);

    if (isNaN(todoID)) {
      res.status(400).json({ error: "Invalid todo ID" });
      return;
    }

    try {
      await pool.query("DELETE FROM todos WHERE id = $1", [todoID]);
      res.sendStatus(200);
    } catch (error) {
      console.error("Error deleting todo", error);
      res.status(500).json({ error: "Error deleting todo" });
    }
  }
);

// PUT (update) a todo title
todoRoutes.put(
  "/todos/:id",
  async (
    req: Request<{ id: string }, {}, TodoBody>,
    res: Response<{ error?: string }>
  ) => {
    const todoID = parseInt(req.params.id, 10);
    const { title, completed } = req.body;

    if (typeof title !== "string" || title.trim() === "") {
      res.status(400).json({ error: "Invalid title data" });
      return;
    }

    if (typeof completed !== "boolean") {
      res.status(400).json({ error: "Invalid completed value" });
      return;
    }

    try {
      await pool.query(
        "UPDATE todos SET title = $1, completed = $2 WHERE id = $3",
        [title, completed, todoID]
      );
      res.sendStatus(200);
    } catch (error) {
      console.error("Error updating todo", error);
      res.status(500).json({ error: "Error updating todo" });
    }
  }
);

export default todoRoutes;
