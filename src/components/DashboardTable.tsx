import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  SortingState,
} from "@tanstack/react-table";
import { ReactElement, useEffect, useState } from "react";
import { Device, DashboardData } from "@/types/common";

const columnHelper = createColumnHelper<Device>();
const columns = [
  columnHelper.accessor("device_id", {
    header: () => "Device ID",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("agent_name", {
    header: () => "Agent Name",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("device_name", {
    header: () => "Device Name",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("device_uptime", {
    header: () => "Device Uptime",
    cell: (info) => info.getValue(),
  }),
];

export default function DashboardTable({ tableData }: DashboardData) {
  const [data, setData] = useState<Device[]>([...(tableData ?? [])]);
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

  const formedTable: ReactElement = (
    <div className="bg-white rounded-md p-4 md:p-8">
      <h2 className="pb-4 font-bold md:text-2xl">Devices</h2>
      <table className="border-collapse table-auto">
        <thead className="bg-sky-900">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="border border-slate-300 px-5 md:min-w-[175px] text-white"
                >
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
        <tbody className="bg-white">
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="border border-slate-300">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const loaded = tableData ? formedTable : <div>Loading...</div>;

  return <>{loaded}</>;
}
