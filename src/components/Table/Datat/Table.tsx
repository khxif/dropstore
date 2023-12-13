"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import DeleteModal from "@/components/Dashboard/Modals/DeleteModal";
import RenameModal from "@/components/Dashboard/Modals/RenameModal";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAppStore } from "@/store/store";
import { Pencil2Icon, TrashIcon } from "@radix-ui/react-icons";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const [setIsDeleteModalOpen, setFileId, setIsRenameModalOpen, setFileName] =
    useAppStore((state) => [
      state.setIsDeleteModalOpen,
      state.setFileId,
      state.setIsRenameModalOpen,
      state.setFileName,
    ]);

  const openDeleteModal = (fileId: string) => {
    setIsDeleteModalOpen(true);
    setFileId(fileId);
  };

  const openRenameModal = (fileId: string, fileName: string) => {
    console.log(fileName);

    setIsRenameModalOpen(true);
    setFileId(fileId);
    setFileName(fileName);
  };

  return (
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
          <DeleteModal />
          <RenameModal />
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {cell.column.id === "timestamp" ? (
                      <div className="flex flex-col space-y-1 ">
                        <div className="text-sm">
                          {(cell.getValue() as Date).toLocaleDateString()}
                        </div>
                        <div className="text-xs text-gray-500">
                          {(cell.getValue() as Date).toLocaleTimeString()}
                        </div>
                      </div>
                    ) : cell.column.id === "fileName" ? (
                      <TooltipProvider>
                        <Tooltip>
                          <div className="flex items-center">
                            <p>{row.getValue("fileName")}</p>
                            <TooltipTrigger asChild>
                              <Button
                                onClick={() =>
                                  openRenameModal(
                                    (row.original as FileType).id,
                                    (row.original as FileType).fileName
                                  )
                                }
                                variant="ghost"
                                className="hover:bg-transparent"
                              >
                                <Pencil2Icon />
                              </Button>
                            </TooltipTrigger>
                          </div>
                          <TooltipContent>
                            <p>Rename file?</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ) : (
                      flexRender(cell.column.columnDef.cell, cell.getContext())
                    )}
                  </TableCell>
                ))}
                <TableCell>
                  <Button
                    variant="secondary"
                    className="hover:bg-red-800 hover:text-white"
                    size="sm"
                    onClick={() =>
                      openDeleteModal((row.original as FileType).id)
                    }
                  >
                    <TrashIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No files found!
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
