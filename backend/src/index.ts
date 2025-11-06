import express from "express";
// We must separate type imports when using new module settings
import type { Express, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// --- App & Port Setup ---
const app: Express = express();
// Use port from environment or default to 8000
const PORT = process.env.PORT || 8000;

// --- Middleware ---
// Enable Cross-Origin Resource Sharing (CORS)
app.use(cors());
// Enable the express.json() middleware to parse JSON request bodies
app.use(express.json());

// --- Types ---
interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

// --- "In-Memory" Database ---
// We'll use a simple array to store our data for now
let todos: Todo[] = [
  { id: 1, text: "Learn TypeScript", completed: false },
  { id: 2, text: "Build a ToDo API", completed: false },
];
let nextId = 3; // To simulate auto-incrementing ID

// --- REST API Endpoints ---

// 1. GET /
// A simple "health check" endpoint
app.get("/", (req: Request, res: Response) => {
  res.send("ToDo API is running!");
});

// 2. GET /todos
// Get all todo items
app.get("/todos", (req: Request, res: Response) => {
  res.status(200).json(todos);
});

// 3. POST /todos
// Create a new todo item
app.post("/todos", (req: Request, res: Response) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Text is required" });
  }

  const newTodo: Todo = {
    id: nextId++,
    text: text,
    completed: false,
  };

  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// 4. PUT /todos/:id
// Update a todo item (e.g., mark as complete)
app.put("/todos/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const { completed } = req.body;

  const todo = todos.find((t) => t.id === parseInt(id));

  if (!todo) {
    return res.status(404).json({ error: "Todo not found" });
  }

  // Update the completed status
  if (typeof completed === "boolean") {
    todo.completed = completed;
  }

  res.status(200).json(todo);
});

// 5. DELETE /todos/:id
// Delete a todo item
app.delete("/todos/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const todoIndex = todos.findIndex((t) => t.id === parseInt(id));

  if (todoIndex === -1) {
    return res.status(404).json({ error: "Todo not found" });
  }

  // Remove the item from the array
  const deletedTodo = todos.splice(todoIndex, 1);
  res.status(200).json(deletedTodo[0]);
});

// --- Start the Server ---
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
