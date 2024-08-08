import DataTable, {
  SearchBar,
  Filter,
  Table,
  Pagination,
} from "@/components/DataTable";
import { columns } from "./columns";
import * as SessionServices from "@/actions/session/session.services";
import { PRIORITY_OPTIONS } from "../../constants";

export default async function SessionTable() {
  const errorSessions = await SessionServices.listErrorSessions({
    otaVersion: "2.90.15",
  });

  return (
    <DataTable columns={columns} data={errorSessions}>
      <div className='space-y-4'>
        <div className='flex gap-2'>
          <SearchBar
            searchColumnName='bannerName'
            searchPlaceholder='Search by merchant name'
          />
          <Filter
            columnName={"priority"}
            title='Priority'
            options={PRIORITY_OPTIONS}
          />
        </div>
        <Table />
        <Pagination />
      </div>
    </DataTable>
  );
}
