'use client'

import { ColumnDef } from '@tanstack/react-table'
import { type ErrorSession } from '@/actions/session/session.schema'
import { MERCHANT_BANNER_IDS } from '@/constants/merchantBannerIds'

export const columns: ColumnDef<ErrorSession>[] = [
  {
    accessorKey: 'bannerId',
    header: 'Banner ID',
  },
  {
    accessorKey: 'merchantName',
    header: 'Merchant Name',
    cell: ({ row }) => {
      const merchantName = MERCHANT_BANNER_IDS[row.original.bannerId]
      return <div>{merchantName}</div>
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
