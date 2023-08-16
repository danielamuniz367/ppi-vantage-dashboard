import DashboardKPI from "./DashboardKPI";
import DashboardTable from "./DashboardTable";

export default function Dashboard({ data }: any) {
  console.log(data);
  return (
    <>
      <DashboardKPI average={data.average} />
      <DashboardTable tableData={data.tableData} />
    </>
  );
}
