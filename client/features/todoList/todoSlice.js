import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTodos = createAsyncThunk("/user/todos", async (id) => {
  const token = localStorage.getItem("token");
  try {
    if (token) {
      const res = await axios.get(`/api/users/${id}/todos`);
      return res.data;
    } else {
      return [];
    }
  } catch (err) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const todosSlice = createSlice({
  name: "todos",
  initialState: {
    todos: [],
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      state.todos = action.payload;
    });
    builder.addCase(fetchTodos.rejected, (state, action) => {
      state.error = action.error;
    });
  },
});

export default todosSlice.reducer;
