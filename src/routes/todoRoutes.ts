import { Router, Request, Response } from "express";

const todoRoutes = Router();

todoRoutes.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the To-Do List App!");
});

export default todoRoutes;
