import React from "react";
import Sidebar from "../components/Sidebar";
import Content from "../components/AdminContent";

const Admin = () => {
  return (
    <div className="flex h-[200vh] ">
      <Sidebar />
      <Content />
    </div>
  );
};

export default Admin;
