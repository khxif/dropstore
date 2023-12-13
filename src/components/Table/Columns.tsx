"use client";

import { DownloadIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";
import { FileIcon } from "react-file-icon";
import { Button } from "../ui/button";
import FileSaver from "file-saver";

export const columns: ColumnDef<FileType>[] = [
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      const type: string = row.getValue("type");
      const extension = type.split("/")[1];

      return (
        <div className="w-6 md:w-10">
          <FileIcon extension={extension} labelColor="#393" />
        </div>
      );
    },
  },
  {
    accessorKey: "fileName",
    header: "Filename",
  },
  {
    accessorKey: "timestamp",
    header: "Date",
  },
  {
    accessorKey: "size",
    header: "Size",
  },
  {
    accessorKey: "downloadURL",
    header: "Link",
    cell: ({ row }) => (
      <a
        href={row.getValue("downloadURL")}
        className="text-slate-950 dark:text-blue-600"
        target="_blank"
        download
      >
        <Button variant="secondary" size="sm">
          <DownloadIcon />
        </Button>
      </a>
    ),
  },
];
