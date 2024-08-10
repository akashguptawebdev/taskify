import React, { useEffect, useState } from "react";

const EditTask = ({ task, setShowEdit, listItem, setTaskList }) => {
  // Initialize state variables for task title, description, and current date
  const [title, setTitle] = useState(listItem?.task || "");
  const [description, setDescription] = useState(listItem?.description || "");
  const [currDate, setCurrDate] = useState("");

  useEffect(() => {
    // Set the current date and time in the  format
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
    let formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);
    setCurrDate(formattedDate);
  }, []);

  const handleEditTask = async () => {
    // Step 1: Retrieve and parse the existing tasks from localStorage
    let storedData = JSON.parse(localStorage.getItem("TaskData"));

    // Step 2: Identify the task to be edited by taskId
    let taskIdToEdit = listItem.taskId;

    // Prepare the updated task object with the new details
    let updatedTask = {
      taskId: taskIdToEdit,
      task: title,
      description: description,
      currDate: currDate, // Update the task's date
    };

    // Step 3: Update the task in the stored data array
    storedData = storedData.map((item) =>
      item.taskId === taskIdToEdit ? { ...item, ...updatedTask } : item
    );

    // Step 4: Save the updated tasks array back to localStorage
    localStorage.setItem("TaskData", JSON.stringify(storedData));

    // Close the edit form after saving
    setShowEdit(listItem);

    // Update the task list in the parent component to re-render the UI
    setTaskList(storedData);
  };

  return (
    <div>
      <div className="TaskList-Container flex justify-center w-full">
        <div className="taskDetails border p-5 rounded-md w-full">
          <div className="mb-3">
            <input
              className="outline-none font-medium w-full text-black px-2 rounded-lg"
              value={title}
              type="text"
              placeholder="Task name"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <input
              className="outline-none w-full text-black px-2 rounded-lg"
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
          disabled={!title} // Disable the button if the title is empty
        >
          Edit Task
        </button>
      </div>
    </div>
  );
};

export default EditTask;
