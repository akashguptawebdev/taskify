import React, { useEffect, useState } from "react";
import { uid } from 'uid';
const AddTask = ({ setTaskAdded }) => {
  // State variables for task details, ID, and current date
  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");
  const [taskId, setTaskId] = useState();
  const [currDate, setCurrDate] = useState("");

  useEffect(() => {
    // Generate and format the current date and time
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
    let formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
    setCurrDate(formattedDate);
  }, []);

  const HandleAddTask = async () => {
    // Generate a random task ID
    const UID = uid(16)

    // Create the task object with all necessary details
    let listItem = {
      taskId: UID,
      task: task,
      description: description,
      currDate: currDate,
      taskCompleted: false,
    };

    saveTask(listItem);

    // Clear input fields after task is added
    setTask("");
    setDescription("");
  };

  const saveTask = (listItem) => {
    // Fetch existing tasks from localStorage
    let getLocalData = JSON.parse(localStorage.getItem("TaskData"));

    // Update localStorage with the new task
    getLocalData
      ? localStorage.setItem(
          "TaskData",
          JSON.stringify([...getLocalData, listItem])
        )
      : localStorage.setItem("TaskData", JSON.stringify([listItem]));

    // Notify parent component about the new task addition
    setTaskAdded(listItem);
  };

  return (
    <div className="py-10 px-8 md:px-20 ">
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

      <div className="rounded-md border-t-0 text-end px-5 py-2">
        <button
          className={`${
            !task ? " bg-slate-300 text-black"  : " bg-[#d57a25]  hover:shadow-slate-400 shadow-sm text-white"
          } py-1 px-8 rounded-full font-bold`}
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
