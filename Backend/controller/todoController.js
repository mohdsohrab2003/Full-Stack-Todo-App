const Todo = require("../model/todo");

// ✅ Get all todos
exports.getAllTodos = async (req, res) => {
  try {
    const tasks = await Todo.find().sort({ createdAt: -1 });
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch todos" });
  }
};

// ✅ Add a new todo
exports.createTodo = async (req, res) => {
  console.log("BODY RECEIVED:", req.body); // ✅ Log incoming body

  const { task } = req.body;

  if (!task) {
    return res.status(400).json({ message: "Task is required" });
  }

  try {
    const newTodo = new Todo({ task });
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (err) {
    console.error("❌ Error saving todo:", err);
    res.status(500).json({ message: "Failed to create todo" });
  }
};

// ✅ Delete a todo
exports.deleteTodo = async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete todo" });
  }
};

// ✅ Update a todo
exports.updateTodo = async (req, res) => {
  const { task } = req.body;
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      { task },
      { new: true }
    );
    res.status(200).json(updatedTodo);
  } catch (err) {
    res.status(500).json({ message: "Failed to update todo" });
  }
};
