import React, { useEffect, useState } from "react";

const AddTask = ({ setTaskAdded }) => {
  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");
  const [taskId, setTaskId] = useState();
  const [currDate, setCurrDate] = useState("");

  useEffect(() => {

let date = new Date();
let options = {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true, 
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    
};
let formateDate = new Intl.DateTimeFormat('en-US', options).format(date);
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
    <div className="py-10 px-8 ">
      <div className="TaskList-Container bg-indigo-200 rounded-lg flex justify-center w-full">
        <div className="taskDetails border p-5 rounded-md w-full ">
          <div className="mb-3 ">
            <input
              className="outline-none font-medium w-full p-2 bg-[#292727] text-white rounded-md"
              value={task}
              type="text"
              placeholder="Task name"
              onChange={(e) => setTask(e.target.value)}
            />
          </div>
          <div>
            <input
              className="outline-none  w-full p-2 rounded-md bg-[#292727] text-white"
              type="text"
              value={description}
              placeholder="Description"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
        
      </div>

      <div className=" rounded-md border-t-0  text-end px-5 py-2">
        <button
          className={`${
            !task ? " bg-slate-300 text-black"  : " bg-[#d57a25]  hover:shadow-slate-400 shadow-sm text-white"
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
