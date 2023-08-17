export type Device = {
  device_id: string;
  agent_name: string;
  device_name: string;
  device_uptime: number;
};

export type DashboardData = {
  average?: number;
  tableData?: Device[];
};
