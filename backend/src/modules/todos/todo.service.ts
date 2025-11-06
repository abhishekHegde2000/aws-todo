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

/**
 * Updates a ToDo item's 'completed' status.
 * @param id - The ID of the todo to update.
 * @param completed - The new 'completed' status.
 * @returns A promise that resolves to the updated todo, or null if not found.
 */
export const update = async (
  id: number,
  completed: boolean
): Promise<Todo | null> => {
  const todo = todos.get(id);

  if (!todo) {
    return null; // Not found
  }

  // Update the todo item
  todo.completed = completed;
  todos.set(id, todo); // Re-set the value in the Map

  return todo;
};

/**
 * Deletes a ToDo item.
 * @param id - The ID of the todo to delete.
 * @returns A promise that resolves to true if deleted, or false if not found.
 */
export const remove = async (id: number): Promise<boolean> => {
  // .delete() returns true if an item was found and deleted
  return todos.delete(id);
};
