import DashboardKPI from "./DashboardKPI";
import DashboardTable from "./DashboardTable";
import { Device, DashboardData } from "@/types/common";

export default function Dashboard(props: DashboardData) {
  const { average, tableData } = props;

  return (
    <div className="flex flex-col-reverse sm:flex-row gap-4">
      <DashboardTable tableData={tableData} />
      <DashboardKPI average={average} />
    </div>
  );
}
