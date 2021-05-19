import React, { useEffect } from "react";
import Header from "../components/Header";
import Sidebar from "../components/SideBar/Index";
import Timeline from "../components/TimeLine";

const Dashboard = () => {
  useEffect(() => {
    document.title = "Instagram";
  }, []);
  return (
    <div className="bg-gray-background">
      <Header />
      <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg mt-10">
        <Timeline />
        <Sidebar />
      </div>
    </div>
  );
};

export default Dashboard;
