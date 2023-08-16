import Dashboard from "@/components/Dashboard";
import { PrismaClient } from "@prisma/client";

export async function getStaticProps() {
  const prisma = new PrismaClient();

  const devices = await prisma.device.findMany({
    select: {
      id: true,
      display_name: true,
    },
  });

  const agentNames = await prisma.agent.findMany({
    select: {
      id: true,
      display_name: true,
    },
  });

  const deviceUptimes = await prisma.device_uptime.findMany({
    select: {
      device_id: true,
      uptime: true,
    },
  });

  const tableData = devices.map((device) => {
    const matchingAgent = agentNames.find((agent) => agent.id === device.id);
    const matchingUptime = deviceUptimes.find(
      (uptime) => uptime.device_id === device.id
    );

    return {
      id: device.id,
      agent_name: matchingAgent ? matchingAgent.display_name : null,
      device_name: device.display_name,
      device_uptime: matchingUptime ? matchingUptime.uptime : null,
    };
  });

  return {
    props: {
      average: 76,
      tableData: JSON.parse(JSON.stringify(tableData)),
    },
  };
}

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

export default function Home(props: DashboardData) {
  return <Dashboard {...props} />;
}
