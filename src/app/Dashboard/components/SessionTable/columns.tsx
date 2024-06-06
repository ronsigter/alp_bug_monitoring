'use client'

import { ColumnDef } from '@tanstack/react-table'
import { type ErrorSession } from '@/actions/session/session.schema'

export const columns: ColumnDef<ErrorSession>[] = [
  {
    accessorKey: 'bannerId',
    header: 'Banner ID',
  },
  {
    accessorKey: 'bannerId',
    header: 'Merchant Name',
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
