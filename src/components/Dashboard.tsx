import React from "react";
import DashboardKPI from "./DashboardKPI";
import DashboardTable from "./DashboardTable";
import { DashboardData } from "@/types/common";

const Dashboard: React.FC<DashboardData> = ({ average, tableData }) => {
  return (
    <div className="flex flex-col-reverse sm:flex-row gap-4">
      <DashboardTable tableData={tableData} />
      <DashboardKPI average={average} />
    </div>
  );
};

export default Dashboard;
