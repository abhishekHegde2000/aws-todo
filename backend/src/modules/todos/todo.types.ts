export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export interface TodoService {
  getAll: () => Promise<Todo[]>;
  create: (text: string) => Promise<Todo>;
  // We'll add update/delete types later
}
