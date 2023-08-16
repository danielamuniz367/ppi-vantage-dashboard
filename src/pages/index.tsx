import Dashboard from "@/components/Dashboard";
import { PrismaClient } from "@prisma/client";

export async function getStaticProps() {
  const prisma = new PrismaClient();
  const data = await prisma.agent.findMany();

  return {
    props: { data },
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

export default function Home({ data }: any) {
  return <Dashboard data={data} />;
}
