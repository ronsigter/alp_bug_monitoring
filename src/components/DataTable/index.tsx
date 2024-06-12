'use client'

import { createContext, useContext, useState } from 'react'
import {
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getSortedRowModel,
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type Table as TableType,
} from '@tanstack/react-table'
export * from './Pagination'
export * from './Filter'
export * from './Table'
export * from './ColumnHeader'
export * from './SearchBar'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  children?: React.ReactNode
}

interface DataTableContextProps<TData> {
  table: TableType<TData>
}

const DataTableContext = createContext<DataTableContextProps<any> | null>(null)

export default function DataTable<TData, TValue>({
  columns,
  data,
  children,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [sorting, setSorting] = useState<SortingState>([])

  const table = useReactTable({
    state: {
      sorting,
      columnFilters,
    },
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  })

  return (
    <DataTableContext.Provider value={{ table }}>
      {children}
    </DataTableContext.Provider>
  )
}

export function useDataTable<TData>(): DataTableContextProps<TData> {
  const context = useContext(DataTableContext)

  if (!context) {
    throw new Error('useDataTable must be used within a DataTableProvider')
  }

  return context as DataTableContextProps<TData>
}
