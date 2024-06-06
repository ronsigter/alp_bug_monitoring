import { Table } from '@tanstack/react-table'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Cross2Icon } from '@radix-ui/react-icons'
import FacetedFilter from './FacedFilter'

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export default function Toolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className='flex items-center justify-between px-2'>
      <div className='flex flex-1 items-center space-x-2'>
        <Input
          placeholder='Search for Merchants...'
          value={
            (table.getColumn('bannerName')?.getFilterValue() as string) ?? ''
          }
          onChange={(event) =>
            table.getColumn('bannerName')?.setFilterValue(event.target.value)
          }
          className='h-8 w-[150px] lg:w-[250px]'
        />
        {table.getColumn('priority') && (
          <FacetedFilter
            column={table.getColumn('priority')}
            title='Priority'
            options={[
              {
                value: 1,
                label: 'High',
              },
              {
                value: 2,
                label: 'Medium',
              },
              {
                value: 3,
                label: 'Low',
              },
            ]}
          />
        )}
        {isFiltered && (
          <Button
            variant='ghost'
            onClick={() => table.resetColumnFilters()}
            className='h-8 px-2 lg:px-3'
          >
            Reset
            <Cross2Icon className='ml-2 h-4 w-4' />
          </Button>
        )}
      </div>
    </div>
  )
}
