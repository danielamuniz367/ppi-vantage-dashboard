import Dashboard from "@/components/Dashboard";
import { PrismaClient } from "@prisma/client";
import { Device, DashboardData } from "@/types/common";
import { useEffect, useState } from "react";

// export async function getStaticProps() {
//   const prisma = new PrismaClient();

//   const combinedData = await prisma.$queryRaw`
//   SELECT
//     d.id AS device_id,
//     d.display_name AS device_name,
//     a.display_name AS agent_name,
//     du.uptime AS device_uptime
//   FROM device d
//   LEFT JOIN agent a ON d.agent_id = a.id
//   LEFT JOIN device_uptime du ON d.id = du.device_id
//   ORDER BY device_id;
// `;

//   const aggregations = await prisma.device_uptime.aggregate({
//     _avg: {
//       uptime: true,
//     },
//   });

//   return {
//     props: {
//       average: JSON.parse(JSON.stringify(aggregations._avg.uptime)),
//       tableData: JSON.parse(JSON.stringify(combinedData)),
//     },
//   };
// }

export default function Home() {
  const [data, setData] = useState<DashboardData | null>(null);

  const fetchData = async () => {
    try {
      const res = await fetch("/api/fetchData");
      const jsonData = await res.json();
      setData(jsonData);
    } catch (error) {
      console.error("Error fetchingn data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="layout_container px-4 mx-auto my-12">
      <main className="flex flex-col md:p-10">
        <div className="flex items-center md:items-start flex-col md:flex-row justify-between">
          <h1 className="pb-5 font-bold md:text-3xl">Vantage Dashboard</h1>
          <button
            className="mb-5 p-2 bg-sky-700 w-full md:max-w-[200px] rounded-full text-white uppercase content-end"
            onClick={fetchData}
          >
            Refresh for latest
          </button>
        </div>

        {data && <Dashboard {...data} />}
      </main>
    </div>
  );
}
