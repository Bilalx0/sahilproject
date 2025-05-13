import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Dashboard from "../components/Dashboard";

const DashboardAdmin = () => {
  const [viewType, setViewType] = useState("mansions"); // Default to Mansions

  return (
    <div className="flex flex-col sm:flex-row">
      <Sidebar setViewType={setViewType} />
      <Dashboard viewType={viewType} />
    </div>
  );
};

export default DashboardAdmin;
