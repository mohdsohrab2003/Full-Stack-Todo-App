const express = require("express");
const todoRoutes = express.Router();
const todoController = require("../controller/todoController");

// RESTful API
todoRoutes.get("/", todoController.getAllTodos);
todoRoutes.post("/", todoController.createTodo);
todoRoutes.put("/:id", todoController.updateTodo);
todoRoutes.delete("/:id", todoController.deleteTodo);

exports.todoRoutes = todoRoutes;
