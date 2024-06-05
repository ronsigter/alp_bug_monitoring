'use client'

import { ColumnDef } from '@tanstack/react-table'

export type AlpSession = {
  result_message: string
  total: number
  banner_id: string
}

export const columns: ColumnDef<AlpSession>[] = [
  {
    accessorKey: 'banner_id',
    header: 'Banner ID',
  },
  {
    accessorKey: 'banner_id',
    header: 'Merchant Name',
  },
  {
    accessorKey: 'result_message',
    header: 'Error Message',
  },
  {
    accessorKey: 'total',
    header: 'Count',
  },
]
