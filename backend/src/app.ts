import express from "express";
// Use type imports for type-only imports
import type { Express, Request, Response } from "express";
import cors from "cors";

const app: Express = express();

// This allows your React frontend (on a different domain) to make requests
app.use(cors());

// 2. Enable JSON Body Parsing
// This parses incoming requests with JSON payloads (e.g., from POST/PUT)
app.use(express.json());

// 1. Health Check Route
// A simple "is the server alive?" endpoint
app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({ status: "UP" });
});

// TODO: Later, we will add our feature routes here, like:
// import todoRoutes from './modules/todos/todo.routes';
// app.use('/api/v1/todos', todoRoutes);

// We export 'app' so server.ts can import it
export default app;
