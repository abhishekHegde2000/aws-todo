import { z } from "zod";

// Schema for creating a todo (body validation)
export const createTodoSchema = z.object({
  body: z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().optional(),
  }),
});

// Schema for updating a todo (params and body validation)
export const updateTodoSchema = z.object({
  params: z.object({
    id: z.string().min(1, "ID is required"),
  }),
  body: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    completed: z.boolean().optional(),
  }),
});

// Schema for deleting a todo (params validation)
export const todoIdSchema = z.object({
  params: z.object({
    id: z.string().min(1, "ID is required"),
  }),
});
