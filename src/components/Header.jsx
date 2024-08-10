import React from "react";

const Header = () => {
  return (
    <div className="w-full h-[8vh] bg-[#1e1d1d] px-4 sm:px-20 flex justify-between items-center ">
      <div className="flex gap-2 items-center ">
        <video src="/todoList.mp4" width="30px" autoPlay="true" muted="true" alt="" className="rounded-xl"/>
        TASKIFY
      </div>
      <div>
        <h2>Home</h2>
      </div>
    </div>
  );
};

export default Header;
