import { Router } from "express";
// Import our controller functions
import * as todoController from "./todo.controller.js";
import { validateRequest } from "../../core/validateRequest.js";
import {
  createTodoSchema,
  updateTodoSchema,
  todoIdSchema,
} from "./todo.schema.js";

const router = Router();

// Define the routes

// GET / (No validation needed)
router.get("/", todoController.getAllTodos);

// POST / (Validate the request body)
router.post(
  "/",
  validateRequest(createTodoSchema), // <-- 2. Add validation middleware
  todoController.createTodo
);

// PUT /:id (Validate the request params and body)
router.put(
  "/:id",
  validateRequest(updateTodoSchema), // <-- 2. Add validation middleware
  todoController.updateTodo
);

// DELETE /:id (Validate the request params)
router.delete(
  "/:id",
  validateRequest(todoIdSchema), // <-- 2. Add validation middleware
  todoController.deleteTodo
);

export default router;
