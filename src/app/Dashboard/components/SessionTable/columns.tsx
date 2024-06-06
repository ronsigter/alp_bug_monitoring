'use client'

import { ColumnDef } from '@tanstack/react-table'
import { type ErrorSession } from '@/actions/session/session.schema'
import { getMerchantDetails } from '@/lib/utils'

export const columns: ColumnDef<ErrorSession>[] = [
  {
    accessorKey: 'bannerId',
    header: 'Banner ID',
  },
  {
    accessorKey: 'merchantName',
    header: 'Merchant Name',
    cell: ({ row }) => {
      const { name } = getMerchantDetails(row.original.bannerId)
      return <div>{name}</div>
    },
  },
  {
    accessorKey: 'priority',
    header: 'Priority',
    cell: ({ row }) => {
      const { priority } = getMerchantDetails(row.original.bannerId)
      return <div>{priority}</div>
    },
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
