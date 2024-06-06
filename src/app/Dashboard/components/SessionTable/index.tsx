import DataTable from '@/components/DataTable'
import { columns } from './columns'
import { listErrorSessions } from '@/actions/session/session.services'

export default async function SessionTable() {
  const errorSessions = await listErrorSessions()
  console.log(errorSessions)

  return <DataTable columns={columns} data={[]} />
}
