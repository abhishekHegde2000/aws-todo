import { Router } from "express";
// Import our controller functions
import * as todoController from "./todo.controller.js";

const router = Router();

// Define the routes
// GET / (relative to the path we'll define in app.ts)
router.get("/", todoController.getAllTodos);

// POST /
router.post("/", todoController.createTodo);

// We'll add PUT and DELETE routes later
// router.put('/:id', todoController.updateTodo);
// router.delete('/:id', todoController.deleteTodo);

export default router;
