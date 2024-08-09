import React, { useEffect, useState } from "react";

const AddTask = ({ setTaskAdded }) => {
  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");
  const [taskId, setTaskId] = useState();
  const [currDate, setCurrDate] = useState("");

  useEffect(() => {
    let date = new Date();
    let formateDate = date.toString().slice(0, 24);
    setCurrDate(formateDate);
  }, []);

  const HandleAddTask = async () => {
    // To generate Current Date and Time

    // To generate Random Number
    let random = Math.floor(Math.random() * 1000);

    let id = random + currDate.slice(23, 25) + currDate.slice(19, 21);
    setTaskId(id);

    // taskData Object
    let listItem = {
      taskId: taskId,
      task: task,
      description: description,
      currDate: currDate,
      taskCompleted:false,
    };

    saveTask(listItem);

    // Clear Input Field
    setTask("");
    setDescription("");
  };

  const saveTask = (listItem) => {
    // Fetching the existing data from localStorage and parsing it back into an object/array
    let getLocalData = JSON.parse(localStorage.getItem("TaskData"));
    console.log("get data", getLocalData);

    // Updating localStorage with the new list item
    {
      getLocalData
        ? localStorage.setItem(
            "TaskData",
            JSON.stringify([...getLocalData, listItem])
          )
        : localStorage.setItem("TaskData", JSON.stringify([listItem]));
    }
    setTaskAdded(listItem);
  };

  return (
    <div className="py-10">
      <div className="TaskList-Container flex justify-center w-full">
        <div className="taskDetails border p-5 rounded-md w-full ">
          <div className="mb-3 ">
            <input
              className="outline-none font-medium w-full"
              value={task}
              type="text"
              placeholder="Task name"
              onChange={(e) => setTask(e.target.value)}
            />
          </div>
          <div>
            <input
              className="outline-none  w-full"
              type="text"
              value={description}
              placeholder="Description"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="border rounded-md border-t-0  text-end px-5 py-2">
        <button
          className={`${
            !task ? " bg-orange-300" : " bg-green-400 text-white"
          }  py-1 px-8 rounded-full font-bold`}
          onClick={HandleAddTask}
          disabled={!task}
        >
          Add Task
        </button>
      </div>
    </div>
  );
};

export default AddTask;
