import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo, updateTodo } from "../features/Todo/todoSlice"; // ✅ Async thunks
import { useLocation, useNavigate } from "react-router-dom";

const AddTask = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const isEdit = location.state?.id;
  const [task, setTask] = useState(location.state?.task || "");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (task.trim()) {
      if (isEdit) {
        await dispatch(updateTodo({ id: isEdit, task }));
      } else {
        await dispatch(addTodo(task));
      }
      setTask("");
      navigate("/");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-8 bg-white rounded-2xl shadow-lg border border-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-center text-teal-700 tracking-tight">
        {isEdit ? "Update" : "Add New"} Task
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label
            htmlFor="task"
            className="block text-sm font-medium text-gray-700"
          >
            Task Description
          </label>
          <div className="relative rounded-md shadow-sm">
            <input
              type="text"
              name="task"
              id="task"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              placeholder="Enter your task here..."
              required
              className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200 placeholder-gray-400"
            />
          </div>
          <p className="mt-1 text-sm text-gray-500">
            Describe your task in a clear and concise way
          </p>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors duration-200"
          >
            {isEdit ? "Update" : "Add"} Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTask;
