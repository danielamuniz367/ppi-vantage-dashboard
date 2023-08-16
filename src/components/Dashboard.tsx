import DashboardKPI from "./DashboardKPI";
import DashboardTable from "./DashboardTable";

type Device = {
  id: string;
  agent_name: string;
  device_name: string;
  device_uptime: number;
};

type DashboardData = {
  average: number;
  tableData: Device[];
};

export default function Dashboard(props: DashboardData) {
  const { average, tableData } = props;

  return (
    <>
      <DashboardKPI average={average} />
      <DashboardTable tableData={tableData} />
    </>
  );
}
