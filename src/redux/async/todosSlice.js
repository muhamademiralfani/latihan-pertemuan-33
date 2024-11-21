import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:3000/todos';
const initialState = {
  todos: [],
  todo: {},
  isUpdate: false,
  error: null,
  isSuccess: false,
};

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const response = await axios.get(API_URL);
  return response.data;
});

export const addTodo = createAsyncThunk('todos/addTodo', async (todo) => {
  const response = await axios.post(API_URL, todo);
  return response.data;
});

export const updateTodo = createAsyncThunk('todos/updateTodo', async (todo) => {
  const response = await axios.put(`${API_URL}/${todo.id}`, todo);
  return response.data;
});

export const currentTodo = (todo) => {
  return {
    type: 'todos/currentTodo',
    payload: todo,
  };
};

export const deleteTodo = createAsyncThunk('todos/deleteTodo', async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id; // Kembalikan ID agar dapat dihapus dari state
});

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    currentTodo: (state, action) => {
      state.todo = action.payload;
      state.isUpdate = true;
    },
    clearCurrentTodo: (state) => {
      state.todo = {};
      state.isUpdate = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodos.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      state.loading = false;
      state.todos = action.payload;
    });
    builder.addCase(fetchTodos.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Something went wrong';
    });

    // Tambah todo
    builder.addCase(addTodo.pending, (state) => {
      state.loading = true;
      state.isSuccess = false;
    });
    builder.addCase(addTodo.fulfilled, (state) => {
      state.loading = false;
      state.isSuccess = true;
    });
    builder.addCase(addTodo.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Something went wrong';
    });

    // Edit todo
    builder.addCase(updateTodo.pending, (state) => {
      state.loading = true;
      state.isUpdate = false;
      state.isSuccess = false;
    });
    builder.addCase(updateTodo.fulfilled, (state) => {
      state.loading = false;
      state.isUpdate = false;
      state.isSuccess = true;
    });
    builder.addCase(updateTodo.rejected, (state, action) => {
      state.loading = false;
      state.isUpdate = false;
      state.error = action.error.message || 'Something went wrong';
    });

    // Hapus todo
    builder.addCase(deleteTodo.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteTodo.fulfilled, (state, action) => {
      state.loading = false;
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    });
    builder.addCase(deleteTodo.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Something went wrong';
    });
  },
});

export default todosSlice.reducer;
