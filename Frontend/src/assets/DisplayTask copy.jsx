import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask } from "../features/Todo/todoSlice";
const DisplayTask = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);
  const navigate = useNavigate();
  return (
    <>
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
        {/* Navbar will be imported as a React component */}
        <div className="max-w-2xl mx-auto mt-10 p-8 bg-white rounded-2xl shadow-lg border border-gray-100">
          <h1 className="text-3xl font-bold mb-8 text-center text-teal-700 tracking-tight">
            My Todo List
          </h1>

          {/* Task List */}
          <ul className="space-y-4">
            {todos.length < 1 ? (
              <li className="text-gray-500 text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                <p className="text-lg">No tasks yet.</p>
                //{" "}
                {/* <p className="text-sm mt-2">
              //   Add your first task to get started!
              // </p> */}
              </li>
            ) : (
              todos.map((todo) => (
                <li
                  key={todo.id}
                  className="group flex justify-between items-center p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-all duration-200 hover:border-teal-200"
                >
                  <span className="text-gray-700 font-medium">{todo.task}</span>
                  <div className="flex items-center space-x-3">
                    <button
                      className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors duration-200"
                      onClick={() => dispatch(deleteTask({ id: todo.id }))}
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => {
                        navigate("/add-task", {
                          state: { id: todo.id, task: todo.task },
                        });
                      }}
                      className="px-4 py-2 text-sm text-teal-600 hover:bg-teal-50 rounded-md transition-colors duration-200"
                    >
                      Update
                    </button>
                  </div>
                </li>
              ))
            )}
          </ul>

          {/* Add Task Button */}
          <div className="mt-8 text-center">
            <Link to="/add-task">
              <button className="inline-flex items-center px-6 py-3 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition-colors duration-200">
                Add New Task
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default DisplayTask;
