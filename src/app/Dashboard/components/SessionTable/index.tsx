import DataTable from '@/components/DataTable'
import { columns } from './columns'

export default function SessionTable() {
  return <DataTable columns={columns} data={[]} />
}
