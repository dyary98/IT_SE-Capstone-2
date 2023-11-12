import React from "react";
import Sidebar from "../components/Sidebar";
import CreateUserForm from "./CreateUserForm";
const CreateUser = () => {
  return (
    <div>
      <div className="flex h-[120vh] bg-gray-100">
        {" "}
        {/* Updated background color for a lighter look */}
        <Sidebar />
        <div className="flex flex-col items-center h-full w-full pl-72 py-4 pr-8">
          <CreateUserForm /> {/* Ensure CreateUserForm has a flat design */}
        </div>
      </div>
    </div>
  );
};

export default CreateUser;
