import Dashboard from "@/components/Dashboard";
import { PrismaClient } from "@prisma/client";
import { Device, DashboardData } from "@/types/common";
import { useEffect, useState } from "react";

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

  const loaded = data ? <Dashboard {...data} /> : <div>Loading...</div>;

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

        {loaded}
      </main>
    </div>
  );
}
