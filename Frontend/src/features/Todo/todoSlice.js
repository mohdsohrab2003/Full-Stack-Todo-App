import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// 👉 Base API URL
const API_URL = "http://localhost:3000/api/todos";

// 🧠 Async Thunks
export const fetchTodos = createAsyncThunk("todo/fetchTodos", async () => {
  const res = await axios.get(API_URL);
  return res.data;
});

export const addTodo = createAsyncThunk("todo/addTodo", async (text) => {
  const res = await axios.post("http://localhost:3000/api/todos", {
    task: text,
  });
  return res.data;
});

export const deleteTodo = createAsyncThunk("todo/deleteTodo", async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
});

export const updateTodo = createAsyncThunk(
  "todo/updateTodo",
  async ({ id, task }) => {
    const res = await axios.put(`${API_URL}/${id}`, { task });
    return res.data;
  }
);

// 🎯 Initial State
const initialState = {
  todos: [],
  loading: false,
  error: null,
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Add
      .addCase(addTodo.fulfilled, (state, action) => {
        state.todos.unshift(action.payload);
      })

      // Delete
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.todos = state.todos.filter((todo) => todo._id !== action.payload);
      })

      // Update
      .addCase(updateTodo.fulfilled, (state, action) => {
        const index = state.todos.findIndex(
          (todo) => todo._id === action.payload._id
        );
        if (index !== -1) {
          state.todos[index] = action.payload;
        }
      });
  },
});

export default todoSlice.reducer;

// import { createSlice, nanoid } from "@reduxjs/toolkit";

// const initialState = {
//   todos: [{ id: nanoid(), task: "Learn Redux Toolkit" }],
// };
// export const todoSlice = createSlice({
//   name: "todo",
//   initialState,
//   reducers: {
//     addTask: (state, action) => {
//       const todo = {
//         id: nanoid(),
//         task: action.payload.text,
//       };
//       state.todos.push(todo);
//     },
//     deleteTask: (state, action) => {
//       state.todos = state.todos.filter((todo) => todo.id !== action.payload.id);
//     },
//     updateTask: (state, action) => {
//       const { id, newTask } = action.payload;
//       const upDateTask = state.todos.find((todo) => todo.id === id);
//       if (upDateTask) {
//         upDateTask.task = newTask;
//       }
//     },
//   },
// });

// export const { addTask, deleteTask, updateTask } = todoSlice.actions;

// export default todoSlice.reducer;
