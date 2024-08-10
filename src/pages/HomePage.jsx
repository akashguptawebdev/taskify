import React, { useEffect, useState } from "react";
import AddTask from "../components/AddTask";
import ShowTask from "../components/ShowTask";
import "./HomePage.css";
const HomePage = () => {
  const [isTaskAdded, setTaskAdded] = useState("");
  const [isTaskDeleted, setTaskDeleted] = useState();
  const [isTaskEdit, setTaskEdit] = useState();
  const [taskList, setTaskList] = useState();

  useEffect(() => {
    let itemList = JSON.parse(localStorage.getItem("TaskData"));

    setTaskList(itemList);
  }, [isTaskAdded, isTaskDeleted, isTaskEdit]);
  return (
    <div className="px-2  md:px-10  ">
      
      <AddTask setTaskAdded={setTaskAdded} />
      <div className="mt-10  pb-10">
        <ShowTask
          taskList={taskList}
          setTaskDeleted={setTaskDeleted}
          setTaskList={setTaskList}
        />
      </div>
    </div>
  );
};

export default HomePage;
