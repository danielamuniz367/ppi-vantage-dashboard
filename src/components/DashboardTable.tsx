import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  SortingState,
} from "@tanstack/react-table";
import { useState } from "react";

// Define your row shape
type Device = {
  deviceId: string;
  agentName: string;
  deviceName: string;
  deviceUptime: number;
};

const columnHelper = createColumnHelper<Device>();

const defaultData = [
  {
    deviceId: "1",
    agentName: "Japan",
    deviceName: "CAM-01",
    deviceUptime: 99.0,
  },
  {
    deviceId: "2",
    agentName: "Canada",
    deviceName: "TV-01",
    deviceUptime: 80.25,
  },
];
// Make some columns!
const columns = [
  columnHelper.accessor("deviceId", {
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("agentName", {
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("deviceName", {
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("deviceUptime", {
    cell: (info) => info.getValue(),
  }),
];

export default function DashboardTable({ tableData }: any) {
  const [data, setData] = useState([...defaultData]);
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });
  return (
    <div className="p-2">
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder ? null : (
                    <div
                      {...{
                        className: header.column.getCanSort()
                          ? "cursor-pointer select-none"
                          : "",
                        onClick: header.column.getToggleSortingHandler(),
                      }}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {{
                        asc: " 🔼",
                        desc: " 🔽",
                      }[header.column.getIsSorted() as string] ?? null}
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="h-4" />
    </div>
  );
}
