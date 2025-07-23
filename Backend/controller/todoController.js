const Todo = require("../model/todo");

exports.getAllTodos = async (req, res, next) => {
  // Logic to get all todos
  const tasks = await Todo.find().sort({ createdAt: -1 }).lean();
  res.render("todo/index", {
    title: "Todo App",
    tasks: tasks,
  });
};

exports.getAddTask = (req, res, next) => {
  res.render("todo/add-Task", {
    title: "Add Task",
    update: false,
    task: "",
  });
};
exports.postAddTask = (req, res, next) => {
  const { task } = req.body;
  const todo = new Todo({
    task: task,
  })
    .save()
    .then(() => {
      console.log("Task added successfully");
    });
  res.redirect("/");
};

exports.postDeleteTask = (req, res, next) => {
  const taskId = req.params.id;
  Todo.findByIdAndDelete(taskId)
    .then(() => {
      console.log("Task deleted successfully");
      res.redirect("/");
    })
    .catch((err) => {
      console.error("Error deleting task:", err);
    });
};
exports.getEditTask = (req, res, next) => {
  const taskId = req.params.id;
  const update = req.query.update === "true";
  Todo.findById(taskId).then((task) => {
    if (!task) {
      console.error("Task not found");
      return res.redirect("/");
    }
    res.render("todo/add-Task", {
      title: "Edit Task",
      task: task,
      update: update,
    });
  });
};
exports.postEditTask = (req, res, next) => {
  const { taskId, task } = req.body;

  Todo.findById(taskId)
    .then((todo) => {
      if (!todo) {
        console.log("Task not found");
        return res.status(404).send("Task not found"); // ❌ stop here
      }

      todo.task = task;
      return todo.save(); // ✅ return promise
    })
    .then((result) => {
      // If result is undefined, it means the task wasn't found.
      if (!result) return;
      console.log("Task updated successfully");
      return res.redirect("/"); // ✅ return this too
    });
};
