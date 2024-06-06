'use client'

import { ColumnDef } from '@tanstack/react-table'
import { type ErrorSession } from '@/actions/session/session.schema'

export const columns: ColumnDef<ErrorSession>[] = [
  {
    accessorKey: 'bannerId',
    header: 'Banner ID',
  },
  {
    accessorKey: 'bannerName',
    header: 'Merchant Name',
  },
  {
    accessorKey: 'priority',
    header: 'Priority',
    cell: ({ row }) => {
      const priorityLabel: { [key: number]: string } = {
        1: 'High',
        2: 'Medium',
        3: 'Low',
      }

      return <div>{priorityLabel[row.original.priority]}</div>
    },
    filterFn: 'weakEquals',
  },
  {
    accessorKey: 'resultMessage',
    header: 'Error Message',
  },
  {
    accessorKey: 'total',
    header: 'Count',
  },
]
