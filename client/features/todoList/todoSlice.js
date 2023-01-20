import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTodos = createAsyncThunk("/todos", async (id) => {
  const token = localStorage.getItem("token");
  try {
    if (token) {
      const res = await axios.get(`/api/todos/${id}`);
      return res.data;
    } else {
      return [];
    }
  } catch (err) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const createTodo = createAsyncThunk(
  "/todo/create",
  async ({ id, desc }) => {
    const token = localStorage.getItem("token");
    try {
      if (token) {
        const res = await axios.post(`/api/todos/${id}`, { desc });
        return res.data;
      }
    } catch (err) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteTodo = createAsyncThunk(
  "todo/delete",
  async ({ todoId }) => {
    const token = localStorage.getItem("token");
    try {
      if (token) {
        const id = todoId;
        const res = await axios.delete(`/api/todos/${id}`);
        return res.data;
      }
    } catch (err) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const todosSlice = createSlice({
  name: "todos",
  initialState: {
    todos: [],
    latestTodo: {},
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      state.todos = action.payload;
    });
    builder.addCase(fetchTodos.rejected, (state, action) => {
      state.error = action.error;
    });
    builder.addCase(createTodo.fulfilled, (state, action) => {
      state.latestTodo = action.payload;
    });
    builder.addCase(createTodo.rejected, (state, action) => {
      state.error = action.error;
    });
    builder.addCase(deleteTodo.fulfilled, (state, action) => {
      state.latestTodo = action.payload;
    });
    builder.addCase(deleteTodo.rejected, (state, action) => {
      state.error = action.error;
    });
  },
});

export default todosSlice.reducer;