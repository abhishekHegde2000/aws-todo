import { Todo } from "./todo.types.js";

// --- "In-Memory" Database ---
const todos: Map<number, Todo> = new Map();
let nextId = 1; // To simulate auto-incrementing ID

// --- Initialize with some mock data ---
const initialTodos: Todo[] = [
  { id: nextId++, text: "Learn production-level structure", completed: false },
  { id: nextId++, text: "Build the ToDo service", completed: false },
];
initialTodos.forEach((todo) => todos.set(todo.id, todo));

// --- Service Functions ---

/**
 * Gets all ToDo items.
 * @returns A promise that resolves to an array of all todos.
 */
export const getAll = async (): Promise<Todo[]> => {
  // .values() returns an iterator, so we spread it into an array
  return [...todos.values()];
};

/**
 * Creates a new ToDo item.
 * @param text - The text content of the new todo.
 * @returns A promise that resolves to the newly created todo.
 */
export const create = async (text: string): Promise<Todo> => {
  if (!text) {
    // In a real app, we'd throw a more specific ApiError
    throw new Error("Text is required to create a ToDo.");
  }

  const newTodo: Todo = {
    id: nextId++,
    text: text,
    completed: false,
  };

  todos.set(newTodo.id, newTodo);
  return newTodo;
};
