import Dashboard from "@/components/Dashboard";
import { PrismaClient } from "@prisma/client";

export async function getStaticProps() {
  const prisma = new PrismaClient();
  // const data = await prisma.agent.findMany();
  const combinedData = await prisma.device_uptime.findMany({
    select: {
      id: true,
    },
  });

  return {
    props: { combinedData },
  };
}

type TableRow = {
  deviceId: string;
  agentName: string;
  deviceName: string;
  deviceUptime: number;
};

type DashboardData = {
  average: number;
  tableData: TableRow[];
};

export default function Home({ combinedData }: any) {
  return <Dashboard data={combinedData} />;
}
