import type { Request, Response } from "express";
// Import our service functions
import * as todoService from "./todo.service.js";

/**
 * Get all todos
 * @route GET /api/v1/todos
 */
export const getAllTodos = async (req: Request, res: Response) => {
  try {
    const todos = await todoService.getAll();
    res.status(200).json(todos);
  } catch (error) {
    // In a real app, this would be handled by a global error handler
    res.status(500).json({ error: "Failed to retrieve todos" });
  }
};

/**
 * Create a new todo
 * @route POST /api/v1/todos
 */
export const createTodo = async (req: Request, res: Response) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: "Text is required" });
    }

    const newTodo = await todoService.create(text);
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ error: "Failed to create todo" });
  }
};
