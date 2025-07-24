import React from "react";
import Navbar from "../components/Navbar";
import DisplayTask from "../components/DisplayTask";

const Home = () => {
  return (
    <>
      <Navbar />
      <div>
        <DisplayTask />
      </div>
    </>
  );
};

export default Home;
