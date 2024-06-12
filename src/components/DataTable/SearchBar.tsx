'use client'

import { Input } from '@/components/ui/input'
import { useDataTable } from '.'

interface SearchBarProps {
  searchPlaceholder?: string
  searchColumnName: string
}

export function SearchBar(props: SearchBarProps) {
  const { table } = useDataTable()
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <Input
      placeholder={props.searchPlaceholder ?? 'Search'}
      value={
        (table.getColumn(props.searchColumnName)?.getFilterValue() as string) ??
        ''
      }
      onChange={(event) =>
        table
          .getColumn(props.searchColumnName)
          ?.setFilterValue(event.target.value)
      }
      className='h-8 w-[150px] lg:w-[250px]'
    />
    /* {table.getColumn('priority') && (
         
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
        )} */
  )
}
