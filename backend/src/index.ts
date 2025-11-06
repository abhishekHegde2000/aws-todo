import express, { Express, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3001;

// === MIDDLEWARE ===
// Allow requests from your React frontend (adjust origin as needed)
app.use(cors({ origin: "http://localhost:5173" })); // Or your React app's port
// Parse incoming JSON requests
app.use(express.json());

// === ROUTES ===
// A simple test route to make sure everything works
app.get("/api", (req: Request, res: Response) => {
  res.json({ message: "Hello from the ToDo backend!" });
});

/*
 * YOUR TODO ROUTES WILL GO HERE
 * e.g., app.get('/api/todos', ...)
 * app.post('/api/todos', ...)
 * app.put('/api/todos/:id', ...)
 * app.delete('/api/todos/:id', ...)
 */

// === START SERVER ===
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
