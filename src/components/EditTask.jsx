import React, { useEffect, useState } from "react";

const EditTask = ({ task, setShowEdit, listItem, setTaskList }) => {
  const [title, setTitle] = useState(listItem?.task || "");
  const [description, setDescription] = useState(listItem?.description || "");
  const [currDate, setCurrDate] = useState("");

  useEffect(() => {
    let date = new Date();
    let options = {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
      weekday: "short",
      year: "numeric",
      month: "short",
    };
    let formateDate = new Intl.DateTimeFormat("en-US", options).format(date);
    setCurrDate(formateDate);
  }, []);

  const handleEditTask = async () => {
    // Step 1: Retrieve and parse the data from localStorage
    let storedData = JSON.parse(localStorage.getItem("TaskData"));

    // Step 2: Find the object you want to edit by taskId
    let taskIdToEdit = listItem.taskId; // Replace with the actual taskId you want to edit

    let updatedTask = {
      taskId: taskIdToEdit,
      task: title,
      description: description,
      currDate: currDate, // Update the date or any other property
    };

    // Step 3: Update the object in the array
    storedData = storedData.map((item) =>
      item.taskId === taskIdToEdit ? { ...item, ...updatedTask } : item
    );

    // Step 4: Save the updated array back to localStorage
    localStorage.setItem("TaskData", JSON.stringify(storedData));
    setShowEdit(listItem);

    console.log("Updated data:", storedData);
    setTaskList(storedData);
  };

  return (
    <div>
      <div className="TaskList-Container flex justify-center w-full">
        <div className="taskDetails  border p-5 rounded-md w-full">
          <div className="mb-3">
            <input
              className="outline-none font-medium w-full"
              value={title}
              type="text"
              placeholder="Task name"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <input
              className="outline-none w-full"
              type="text"
              value={description}
              placeholder="Description"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="border rounded-md border-t-0 text-end px-5 py-2">
        <button
          className={`${
            !title ? "bg-red-500" : "bg-green-800"
          } text-white py-1 px-8 rounded-full font-bold cursor-pointer`}
          onClick={handleEditTask}
          disabled={!title}
        >
          Edit Task
        </button>
      </div>
    </div>
  );
};

export default EditTask;
