import {
  DataTableProvider,
  Table,
  Pagination,
  SearchBar,
  Filter,
} from '@/components/DataTable'
import { columns } from './columns'
import { listErrorSessions } from '@/actions/session/session.services'

export default async function SessionTable() {
  const errorSessions = await listErrorSessions()

  return (
    <DataTableProvider columns={columns} data={errorSessions}>
      <div className='space-y-4'>
        <div className='flex gap-2'>
          <SearchBar
            searchColumnName='bannerName'
            searchPlaceholder='Search by merchant name'
          />
          <Filter
            columnName={'priority'}
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
        </div>
        <Table />
        <Pagination />
      </div>
    </DataTableProvider>
  )
}
