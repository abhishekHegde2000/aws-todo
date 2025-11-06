import { Router } from "express";
// Import our controller functions
import * as todoController from "./todo.controller.js";

const router = Router();

// Define the routes

router.get("/", todoController.getAllTodos);
router.post("/", todoController.createTodo);
router.put("/:id", todoController.updateTodo);
router.delete("/:id", todoController.deleteTodo);

export default router;
