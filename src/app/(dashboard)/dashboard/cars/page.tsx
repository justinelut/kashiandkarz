"use client"

import * as React from "react"
import {
  CaretSortIcon,
  ChevronDownIcon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"

// Define the Car type
type Car = {
  id: string
  make: string
  model: string
  year: number
  price: number
  mileage: number
  condition: string
  transmission: string
  fuelType: string
  color: string
  status: "available" | "sold" | "pending"
}

// Mock data for cars
const data: Car[] = [
  {
    id: "CAR001",
    make: "Toyota",
    model: "Camry",
    year: 2023,
    price: 25000,
    mileage: 15000,
    condition: "Excellent",
    transmission: "Automatic",
    fuelType: "Petrol",
    color: "Silver",
    status: "available",
  },
  {
    id: "CAR002",
    make: "Honda",
    model: "CR-V",
    year: 2022,
    price: 28000,
    mileage: 20000,
    condition: "Good",
    transmission: "Automatic",
    fuelType: "Petrol",
    color: "Black",
    status: "pending",
  },
  {
    id: "CAR003",
    make: "BMW",
    model: "X5",
    year: 2023,
    price: 65000,
    mileage: 5000,
    condition: "Excellent",
    transmission: "Automatic",
    fuelType: "Diesel",
    color: "White",
    status: "available",
  },
  {
    id: "CAR004",
    make: "Mercedes-Benz",
    model: "C-Class",
    year: 2022,
    price: 45000,
    mileage: 18000,
    condition: "Good",
    transmission: "Automatic",
    fuelType: "Petrol",
    color: "Blue",
    status: "sold",
  },
  {
    id: "CAR005",
    make: "Audi",
    model: "Q7",
    year: 2023,
    price: 70000,
    mileage: 10000,
    condition: "Excellent",
    transmission: "Automatic",
    fuelType: "Diesel",
    color: "Gray",
    status: "available",
  },
]

export const columns: ColumnDef<Car>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: "Car ID",
    cell: ({ row }) => <div>{row.getValue("id")}</div>,
  },
  {
    accessorKey: "make",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Make
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div>{row.getValue("make")}</div>,
  },
  {
    accessorKey: "model",
    header: "Model",
    cell: ({ row }) => <div>{row.getValue("model")}</div>,
  },
  {
    accessorKey: "year",
    header: "Year",
    cell: ({ row }) => <div>{row.getValue("year")}</div>,
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => <div>${row.getValue("price").toLocaleString()}</div>,
  },
  {
    accessorKey: "mileage",
    header: "Mileage",
    cell: ({ row }) => <div>{row.getValue("mileage").toLocaleString()} km</div>,
  },
  {
    accessorKey: "condition",
    header: "Condition",
    cell: ({ row }) => <div>{row.getValue("condition")}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      return (
        <div className={`capitalize ${
          status === "available" 
            ? "text-green-600" 
            : status === "pending" 
            ? "text-yellow-600" 
            : "text-red-600"
        }`}>
          {status}
        </div>
      )
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <DotsHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>View details</DropdownMenuItem>
            <DropdownMenuItem>Edit car</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600">Delete car</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export default function CarsPage() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter by make..."
          value={(table.getColumn("make")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("make")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
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
                  )
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
                  No cars found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-muted-foreground flex-1 text-sm">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  )
}