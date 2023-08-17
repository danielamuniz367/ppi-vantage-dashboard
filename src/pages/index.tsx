import Dashboard from "@/components/Dashboard";
import { PrismaClient } from "@prisma/client";

export async function getStaticProps() {
  const prisma = new PrismaClient();

  const combinedData = await prisma.$queryRaw`
  SELECT
    d.id AS device_id,
    d.display_name AS device_name,
    a.display_name AS agent_name,
    du.uptime AS device_uptime
  FROM device d
  LEFT JOIN agent a ON d.agent_id = a.id
  LEFT JOIN device_uptime du ON d.id = du.device_id
  ORDER BY device_id; 
`;

  console.log(combinedData);

  const aggregations = await prisma.device_uptime.aggregate({
    _avg: {
      uptime: true,
    },
  });

  return {
    props: {
      average: JSON.parse(JSON.stringify(aggregations._avg.uptime)),
      tableData: JSON.parse(JSON.stringify(combinedData)),
    },
  };
}

type Device = {
  device_id: string;
  agent_name: string;
  device_name: string;
  device_uptime: number;
};

type DashboardData = {
  average: number;
  tableData: Device[];
};

export default function Home(props: DashboardData) {
  return (
    <div className="layout_container px-4 mx-auto my-12">
      <main className="flex flex-col p-10">
        <div className="flex flex-row justify-between">
          <h1 className="pb-5 font-bold">Vantage Dashboard</h1>
          <button className="mb-5 p-2 bg-sky-700 md:min-w-[200px] rounded-full text-white uppercase content-end">
            Refresh Data
          </button>
        </div>

        <Dashboard {...props} />
      </main>
    </div>
  );
}
