import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import React from "react";
import useLocalizer from "@/hooks/useLocalizer";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Empty } from "./core/Empty";

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading?: boolean;
  ignorePagination?: boolean;
}

export default function DataTable<TData, TValue>({
  columns,
  data,
  isLoading,
  ignorePagination = false,
}: DataTableProps<TData, TValue>) {
  const { t, isRtl } = useLocalizer();

  const [pagination, setPagination] = React.useState<{
    pageIndex: number;
    pageSize: number;
  }>({
    pageIndex: 0,
    pageSize: 5,
  });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    ...(!ignorePagination && {
      getPaginationRowModel: getPaginationRowModel(),
      onPaginationChange: setPagination,
      state: {
        pagination,
      },
    }),
    getSortedRowModel: getSortedRowModel(),
    enableMultiRowSelection: false,
    enableRowSelection: true,
    enableColumnFilters: true,
  });

  return (
    <div className="max-w-full">
      <Table className="table-auto border border-primary/20">
        <TableHeader className="bg-card text-secondary">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow
              key={headerGroup.id}
              className="bg-card hover:bg-transparent"
            >
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    className={cn(
                      isRtl ? "text-right" : "text-left",
                      "lg:font-bold "
                    )}
                  >
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
          {table.getRowModel().rows?.length > 0 ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow className="bg-transparent">
              <TableCell colSpan={columns.length} className="text-center">
                {isLoading ? (
                  <p className="flex flex-row justify-center items-center gap-2">
                    <Loader2 className="animate-spin" />
                    {t("paragraphs.loading")}
                  </p>
                ) : (
                  <Empty title={t("paragraphs.noData")} className="h-20" />
                )}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
