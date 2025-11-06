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

// ... (keep 'getAllTodos' and 'createTodo')

/**
 * Update a todo
 * @route PUT /api/v1/todos/:id
 */
export const updateTodo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { completed } = req.body;

    // Basic validation
    if (typeof completed !== "boolean") {
      return res
        .status(400)
        .json({ error: "'completed' status (boolean) is required" });
    }

    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
      return res.status(400).json({ error: "Invalid ID format" });
    }

    const updatedTodo = await todoService.update(numericId, completed);

    if (!updatedTodo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.status(200).json(updatedTodo);
  } catch (error) {
    res.status(500).json({ error: "Failed to update todo" });
  }
};

/**
 * Delete a todo
 * @route DELETE /api/v1/todos/:id
 */
export const deleteTodo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const numericId = parseInt(id, 10);

    if (isNaN(numericId)) {
      return res.status(400).json({ error: "Invalid ID format" });
    }

    const wasDeleted = await todoService.remove(numericId);

    if (!wasDeleted) {
      return res.status(404).json({ error: "Todo not found" });
    }

    // Send a 204 No Content response, as is common for DELETE
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete todo" });
  }
};
