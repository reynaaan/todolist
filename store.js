import create from 'zustand';

// Create Zustand store for managing authentication state
export const useAuthStore = create((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));

// Create Zustand store for managing todos
export const useTodoStore = create((set) => ({
  todos: [],
  setTodos: (todos) => set({ todos }),
  addTodo: (todo) =>
    set((state) => ({ todos: [...state.todos, todo] })),
  deleteTodo: (id) =>
    set((state) => ({ todos: state.todos.filter((todo) => todo.id !== id) })),
  updateTodo: (id, newText) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, text: newText } : todo
      ),
    })),
}));
