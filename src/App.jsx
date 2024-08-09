import React, { useEffect, useState } from "react";
import "./App.css";
import AddTask from "./components/AddTask";
import ShowTask from "./components/ShowTask";

const App = () => {
  const [isTaskAdded, setTaskAdded] = useState("");
  const [isTaskDeleted, setTaskDeleted] = useState();
  const [isTaskEdit, setTaskEdit] = useState();
  const [taskList, setTaskList] = useState();
  useEffect(() => {
    let itemList = JSON.parse(localStorage.getItem("TaskData"));
    
    setTaskList(itemList);
  }, [isTaskAdded, isTaskDeleted, isTaskEdit]);

  return (
    <div className="px-10    h-screen bg-[#155e75]">
      <AddTask setTaskAdded={setTaskAdded}  />
      <div className="mt-10">
        <ShowTask
          taskList={taskList}
          setTaskDeleted={setTaskDeleted}
          setTaskList={setTaskList}
        />
      </div>
    </div>
  );
};

export default App;
