import DashboardKPI from "./DashboardKPI";
import DashboardTable from "./DashboardTable";
import { DashboardData } from "@/types/common";

export default function Dashboard({ average, tableData }: DashboardData) {
  return (
    <div className="flex flex-col-reverse sm:flex-row gap-4">
      <DashboardTable tableData={tableData} />
      <DashboardKPI average={average} />
    </div>
  );
}
