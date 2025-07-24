const express = require("express");
const path = require("path");
const cors = require("cors");
const { todoRoutes } = require("./routes/todoRoutes");
const { default: mongoose } = require("mongoose");

const app = express();
const DB_URL =
  "mongodb+srv://banosayra2008:Sohrabmohd%40952@todoapp.q0h7op4.mongodb.net/TodoApp?retryWrites=true&w=majority&appName=TodoApp";

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173", // ✅ Your frontend URL
    credentials: true,
  })
);
app.use("/api/todos", todoRoutes);

const PORT = process.env.PORT || 3000;
mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("Connected to Mongo");
    app.listen(PORT, () => {
      console.log(`Server running on address http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Error while connecting to Mongo: ", err);
  });
