import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Input } from "@/components/ui/input";

import { useEffect, useState } from "react";
import StatusFilters from "./StatusFilter";
import SectionHead from "./SectionHead";
import { Capsule } from "@/context/capsules";
import { DataTablePagination } from "./DataTablePagination";
import { TableColumn } from "./Columns";



type CapsulesProps = {
  data: Capsule[];
  columns: TableColumn[];
};

export function CapsuleDataTable({ data, columns }: CapsulesProps) {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});

  const [filteredTable, setFilteredTable] = useState();

  console.log("DataTable", data);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  // console.log(table.getAllColumns())

  return (
    <section className="w-full my-8 m-auto flex flex-col items-center max-w-screen-xl justify-center">
      <SectionHead title="Capsules Data" />
      <div className="flex items-center flex-wrap gap-y-2 py-4">
        <div className="flex w-full gap-2 items-center">
          <Input
            placeholder="Search capsule serial..."
            value={table.getColumn("capsule_serial")?.getFilterValue() ?? ""}
            onChange={(event) =>
              table
                .getColumn("capsule_serial")
                ?.setFilterValue(event.target.value)
            }
            className="max-w-xs shadow-sm"
          />
          <StatusFilters />
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  {table.getRowModel().rows?.length < 0 ? "Loading..." : "No Results"}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          <TableFooter className="bg-gray-100 font-bold text-md">
            {table.getFooterGroups().map((footergroup) => (
              <TableRow key={footergroup.id}>
                {footergroup.headers.map((footer) => {
                  return (
                    <TableHead key={footer.id}>
                      {footer.isPlaceholder
                        ? null
                        : flexRender(
                            footer.column.columnDef.footer,
                            footer.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableFooter>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <DataTablePagination capsules={table} />
      </div>
    </section>
  );
}
