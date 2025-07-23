const express = require("express");

const todoRoutes = express.Router();
const todoController = require("../controller/todoController");

todoRoutes.get("/", todoController.getAllTodos);
todoRoutes.get("/add-task", todoController.getAddTask);
todoRoutes.post("/add-task", todoController.postAddTask);
todoRoutes.post("/delete-task/:id", todoController.postDeleteTask);
todoRoutes.get("/update-task/:id", todoController.getEditTask);
todoRoutes.post("/update-task", todoController.postEditTask);

exports.todoRoutes = todoRoutes;
