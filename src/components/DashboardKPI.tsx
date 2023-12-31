import dynamic from "next/dynamic";
import { DashboardData } from "@/types/common";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function DashboardKPI({ average }: DashboardData) {
  const OPTIONS = {
    chart: {
      offsetY: -20,
      sparkline: {
        enabled: true,
      },
    },
    plotOptions: {
      radialBar: {
        startAngle: -90,
        endAngle: 90,
        track: {
          background: "#e7e7e7",
          strokeWidth: "97%",
          margin: 5, // margin is in pixels
          dropShadow: {
            enabled: true,
            top: 2,
            left: 0,
            color: "#999",
            opacity: 1,
            blur: 2,
          },
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            offsetY: -2,
            fontSize: "22px",
          },
        },
      },
    },
    grid: {
      padding: {
        top: -10,
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "light",
        shadeIntensity: 0.4,
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 50, 53, 91],
      },
    },
    labels: ["Average Results"],
  };
  // improve this
  const SERIES = [Math.round((average ?? 0) * 100) / 100];

  const loaded = average ? (
    <Chart
      className="m-auto"
      type="radialBar"
      options={OPTIONS}
      series={SERIES}
      width={"100%"}
      height={320}
    />
  ) : (
    <div>Loading...</div>
  );

  return (
    <div className="flex flex-col items-center bg-white rounded-md p-4 md:p-8">
      <h2 className="font-bold md:text-2xl">KPI: Average Device Uptime</h2>
      {loaded}
    </div>
  );
}
