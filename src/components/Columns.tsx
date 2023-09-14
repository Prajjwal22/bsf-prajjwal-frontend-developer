"use client";

import { MoreHorizontal, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
export type TableColumn = {
  accessorKey: string;
  header: ((params: { column: any }) => React.ReactNode) | string;
  cell?: ((params: { row: any }) => React.ReactNode) | string;
  // id?: ((params: { row: any }) => React.ReactNode) | string;
};

type missions = {
  name:string;
  flight:number
}

export const columns: TableColumn[] = [
  {
    accessorKey: "capsule_serial",
    header: "Capsule Serial",
  },
  {
    accessorKey: "capsule_id",
    header: "Capsule ID",
  },
  {
    accessorKey: "status",
    header: "Capsule status",
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
    accessorKey: "reuse_count",
    header: "Resused",
  },

  {
    header: "Action",
    accessorKey: "actions",
    cell: ({ row }) => {
      const capsule = row.original;
      console.log(capsule);
      return (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">View Details</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{capsule.capsule_serial}</DialogTitle>
              <DialogDescription>{capsule.details}</DialogDescription>
            </DialogHeader>
            <span className="flex justify-between items-center mb-10">
              <p>Launch Date: {capsule.original_launch}</p>
              <p>Landings: {capsule.landings}</p>
            </span>
            <span className="flex justify-between items-center">
              <p>Serial: {capsule.capsule_serial}</p>
              <p>Status: {capsule.status}</p>
            </span>
            <i>Missions</i>
            <ul>{
              capsule.missions.map((task:missions,i:number)=><li key={i}> {task.name}: {task.flight} flights </li>)}</ul>

            <DialogFooter>
              <p>Type: {capsule.type}</p>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      );
    },
  },
];
