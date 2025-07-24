import { Route, Routes } from "react-router-dom";
import Home from "./page/Home";

import AddTaskPage from "./page/AddTaskPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-task" element={<AddTaskPage />} />
      </Routes>
    </>
  );
}

export default App;
