import DataTable, {
  SearchBar,
  Filter,
  Table,
  Pagination,
} from "@/components/DataTable";
import { columns } from "./columns";
import * as SessionServices from "@/actions/session/session.services";
import { PRIORITY_OPTIONS } from "../../constants";

export default async function SessionTable({
  searchParams,
}: {
  searchParams: any;
}) {
  let errorSessions = await SessionServices.listErrorSessions();

  const latest: { [key: string]: string } = {};
  errorSessions.forEach((errorSession) => {
    const ota = errorSession.alpVersion.split(".");
    const current = latest[errorSession.bannerId];

    if (!current) {
      latest[errorSession.bannerId] = errorSession.alpVersion;
    } else {
      const currentOta = +current.split(".");
      const otaVersion = +ota[2];
      if (currentOta < otaVersion) {
        latest[errorSession.bannerId] = errorSession.alpVersion;
      }
    }
  });

  if (searchParams.latestOTA) {
    errorSessions = errorSessions.filter(
      (errorSession) =>
        errorSession.alpVersion === latest[errorSession.bannerId]
    );
  }

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
