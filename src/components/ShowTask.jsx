import React, { useEffect, useState } from "react";
import "./ShowTaskStyle.css";
import EditTask from "./EditTask";

const ShowTask = ({ taskList, setTaskDeleted, setTaskList }) => {
  const [showEdit, setShowEdit] = useState(null);
  const [boo, setBool] = useState(false);

  const HandleDelete = (listItem) => {
    let itemList = JSON.parse(localStorage.getItem("TaskData"));
    let filterResult = itemList?.filter(
      (obj) => obj.taskId !== listItem?.taskId
    );

    // Updating localStorage with the new list item
    localStorage.setItem("TaskData", JSON.stringify(filterResult));
    setTaskDeleted(listItem);
  };

  const HandleCompleteTask =  (listItem) => {
    setBool(!boo)
    // Step 1: Retrieve and parse the data from localStorage
    let storedData = JSON.parse(localStorage.getItem("TaskData"));

    // Step 2: Find the object you want to edit by taskId
    let taskIdToEdit = listItem.taskId; // Replace with the actual taskId you want to edit
    
    let updatedTask = {
      taskCompleted:boo,
    };

    // Step 3: Update the object in the array
    storedData = storedData.map((item) =>
      item.taskId === taskIdToEdit ? { ...item, ...updatedTask } : item
    );

    // Step 4: Save the updated array back to localStorage
    localStorage.setItem("TaskData", JSON.stringify(storedData));
    setShowEdit(listItem);
  
    setTaskList(storedData);
  };

  const HandleEdit = (listItem) => {
    setShowEdit(listItem.taskId);
  };



  return (
    <>
      {taskList?.map((listItem) => {
        return showEdit === listItem.taskId ? (
          <EditTask
            key={listItem.taskId}
            listItem={listItem}
            setShowEdit={setShowEdit}
            setTaskList={setTaskList}
          />
        ) : (
          <div key={listItem.taskId} className="taskData mt-5">
            <div className="data rounded-full border px-5 mb-5 flex justify-between items-center">
              <div className="py-2 flex justify-center items-center">
                <div className="roundedDiv cursor-pointer" onClick={() =>HandleCompleteTask (listItem)}>{listItem.taskCompleted? <img src="/icons8-tick.svg" />:""}</div>
                <div>
                  <h6 className="font-bold text-sm font-sans">{listItem?.task}</h6>
                  <p>{listItem?.description}</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="text-slate-400 font-bold relative sm:sticky top-6 left-12 mr-5 text-[6px] sm:text-sm ">
                  {listItem?.currDate}
                </div>
                <div className="flex justify-center items-center">
                  <img
                    src="/icons8-edit.svg"
                    className="cursor-pointer mr-2 "
                    onClick={() => HandleEdit(listItem)}
                    width="20px"
                    alt="edit"
                  />

                  <img
                    src="/icons8-delete.svg"
                    className="cursor-pointer"
                    onClick={() => HandleDelete(listItem)}
                    width="20px"
                    alt="Delete"
                  />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ShowTask;
