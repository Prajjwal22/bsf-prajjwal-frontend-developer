"use client";

import { MoreHorizontal, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export type TableColumn = {
    accessorKey: string;
    header: ((params: { column: any }) => React.ReactNode) | string;
  };

export const columns: TableColumn[]=[
  {
    accessorKey: "capsule_serial",
    header: "Capsule Serial",
  },
  {
    accessorKey: "capsule_id",
    header: "Capsule ID",
  },
  {
    accessorKey: "original_launch",
    header: ({ column }) => {
      return (
        <Button
          style={{ paddingLeft: "2px" }}
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Launch Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "landings",
    header: ({ column }) => {
      return (
        <Button
          style={{ paddingLeft: "2px" }}
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Landings
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "type",
    header: ({ column }) => {
      return (
        <Button
          style={{ paddingLeft: "2px" }}
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Type
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "detals",
    header: "Details",
  },
  {
    accessorKey: "reuse_count",
    header: "Resused",
  },
];
