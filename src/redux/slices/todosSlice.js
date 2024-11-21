import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  todos: [],
  todo: null,
  isUpdate: false,
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todos.push(action.payload);
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    toggleTodo: (state, action) => {
      const todo = state.todos.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    updateTodo: (state, action) => {
      const { id, text } = action.payload;
      const todo = state.todos.find((todo) => todo.id === id);
      if (todo) {
        todo.text = text;
      }
      state.todo = null;
      state.isUpdate = false;
    },
    currentTodo: (state, action) => {
      state.todo = action.payload;
      state.isUpdate = true;
    },
  },
});

export const { addTodo, deleteTodo, toggleTodo, updateTodo, currentTodo } = todosSlice.actions;
export default todosSlice.reducer;
