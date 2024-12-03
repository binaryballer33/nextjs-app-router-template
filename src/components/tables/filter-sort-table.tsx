"use client"

import type {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState } from "@tanstack/react-table";

import  { useState } from 'react';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import randomStockTrades from "@/mocks/random-stock-data";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import ColumnDropdownMenu from "./column-dropdown-menu";


export default function FilterSortTable() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  // Define columns with sorting and filtering capabilities
  const columns: ColumnDef<typeof randomStockTrades[0]>[] = [
    {
      accessorKey: "datePurchased",
      cell: ({ row }) => row.getValue("datePurchased"),
      header: ({ column }) => (
        <div className="flex gap-2">
        <Button
          className="p-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          variant="ghost"
        >
          Date Purchased
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>

        <ColumnDropdownMenu column={column} />
        </div>
      ),
    },
    {
      accessorKey: "dateSold",
      cell: ({ row }) => row.getValue("dateSold") || "N/A",
      header: ({ column }) => (
        <div className="flex gap-2">
        <Button
          className="p-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          variant="ghost"
        >
          Date Sold
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>

        <ColumnDropdownMenu column={column} />
        </div>
      ),
    },
    {
      accessorKey: "ticker",
      cell: ({ row }) => row.getValue("ticker"),
      header: ({ column }) => (
        <div className="flex gap-2">
        <Button
          className="p-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          variant="ghost"
        >
          Ticker
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>

        <ColumnDropdownMenu column={column} />
        </div>
      ),
    },
    {
      accessorKey: "quantity",
      cell: ({ row }) => row.getValue("quantity"),
      header: ({ column }) => (
        <div className="flex gap-2">
        <Button
          className="p-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          variant="ghost"
        >
          Quantity
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>

        <ColumnDropdownMenu column={column} />
        </div>
      ),
    },
    {
      accessorKey: "buyPrice",
      cell: ({ row }) => `$${Number(row.getValue("buyPrice")).toFixed(2)}`,
      header: ({ column }) => (
        <div className="flex gap-2">
        <Button
          className="p-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          variant="ghost"
        >
          Buy Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
        <ColumnDropdownMenu column={column} />
        </div>
      ),
    },
    {
      accessorKey: "sellPrice",
      cell: ({ row }) => row.getValue("sellPrice") ? `$${Number(row.getValue("sellPrice")).toFixed(2)}` : "N/A",
      header: ({ column }) => (
        <div className="flex gap-2">
        <Button
          className="p-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          variant="ghost"
        >
          Sell Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>

        <ColumnDropdownMenu column={column} />
        </div>
      ),
    },
    {
      accessorKey: "status",
      cell: ({ row }) => row.getValue("status"),
      header: ({ column }) => (
        <div className="flex gap-2">
        <Button
          className="p-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          variant="ghost"
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>

        <ColumnDropdownMenu column={column} />
        </div>
      ),
    },
    {
      accessorKey: "profitLoss",
      cell: ({ row }) => {
        const profitLoss = row.getValue("profitLoss");
        return profitLoss !== null
          ? `$${Number(profitLoss).toFixed(2)}`
          : "N/A";
      },
      header: ({ column }) => (
        <div className="flex gap-2">
        <Button
          className="p-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          variant="ghost"
        >
          Profit/Loss
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>

        <ColumnDropdownMenu column={column} />
        </div>
      ),
    },
    {
      accessorKey: "profitLossPercentage",
      cell: ({ row }) => {
        const percentage = row.getValue("profitLossPercentage");
        return percentage !== null
          ? `${Number(percentage).toFixed(2)}%`
          : "N/A";
      },
      header: ({ column }) => (
        <div className="flex gap-2">
        <Button
          className="p-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          variant="ghost"
        >
          P/L %
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>

        <ColumnDropdownMenu column={column} />
        </div>
      ),
    },
    {
      accessorKey: "twentyPercentTarget",
      cell: ({ row }) => `$${Number(row.getValue("twentyPercentTarget")).toFixed(2)}`,
      header: ({ column }) => (
        <div className="flex gap-2">
        <Button
          className="p-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          variant="ghost"
        >
          20% Target
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>

        <ColumnDropdownMenu column={column} />
        </div>
      ),
    },
    {
      accessorKey: "fortyPercentTarget",
      cell: ({ row }) => `$${Number(row.getValue("fortyPercentTarget")).toFixed(2)}`,
      header: ({ column }) => (
        <div className="flex gap-2">
        <Button
          className="p-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          variant="ghost"
        >
          40% Target
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>

        <ColumnDropdownMenu column={column} />
        </div>
      ),
    },
    {
      accessorKey: "twentyPercentStopLoss",
      cell: ({ row }) => `$${Number(row.getValue("twentyPercentStopLoss")).toFixed(2)}`,
      header: ({ column }) => (
        <div className="flex gap-2">
        <Button
          className="p-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          variant="ghost"
        >
          20% Stop Loss
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>

        <ColumnDropdownMenu column={column} />
        </div>
      ),
    },
    {
      accessorKey: "fortyPercentStopLoss",
      cell: ({ row }) => `$${Number(row.getValue("fortyPercentStopLoss")).toFixed(2)}`,
      header: ({ column }) => (
        <div className="flex gap-2">
        <Button
          className="p-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          variant="ghost"
        >
          40% Stop Loss
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>

        <ColumnDropdownMenu column={column} />
        </div>
      ),
    },
  ];

  const table = useReactTable({
    columns,
    data: randomStockTrades,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    state: {
      columnFilters,
      columnVisibility,
      rowSelection,
      sorting,
    },
  });

  return (
    <div className="w-full p-4">
      <div className="flex items-center py-4">
        <Input
          className="max-w-sm"
          onChange={(event) =>
            table.getColumn("ticker")?.setFilterValue(event.target.value)
          }
          placeholder="Filter tickers..."
          value={(table.getColumn("ticker")?.getFilterValue() as string) ?? ""}
        />
        <Select
          onValueChange={(value) => {
            table.setPageSize(Number(value));
          }}
          value={table.getState().pagination.pageSize.toString()}
        >
          <SelectTrigger className="w-[180px] ml-4">
            <SelectValue placeholder="Rows per page" />
          </SelectTrigger>
          <SelectContent>
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <SelectItem key={pageSize} value={pageSize.toString()}>
                {pageSize} Rows
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
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
                  data-state={row.getIsSelected() && "selected"}
                  key={row.id}
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
                  className="h-24 text-center"
                  colSpan={columns.length}
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            disabled={!table.getCanPreviousPage()}
            onClick={() => table.previousPage()}
            size="sm"
            variant="outline"
          >
            Previous
          </Button>
          <Button
            disabled={!table.getCanNextPage()}
            onClick={() => table.nextPage()}
            size="sm"
            variant="outline"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
