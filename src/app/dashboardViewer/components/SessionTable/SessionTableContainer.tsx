"use client";

import DataTable, { SearchBar, Filter, Table, Pagination } from "@/components/DataTable";
import { columns } from "./columns";
import { PLATFORM_OPTIONS, PRIORITY_OPTIONS } from "../../constants";
import { OnlyLatestSwitch } from "./OnlyLatestSwitch";
import { ListErrorSessionsResponse } from "@/actions/session/session.schema";
import { useSessionIdsStore } from "../../store/useSessionIdsStore";
import { useEffect, useState } from "react";

type SessionTableContainerProps = {
  sessions: ListErrorSessionsResponse;
  latest: { [key: string]: string };
};

export function SessionTableContainer({ sessions, latest }: SessionTableContainerProps) {
  const { latestOTA } = useSessionIdsStore();
  const [data, setData] = useState(sessions);

  useEffect(() => {
    if (latestOTA) {
      const filterdSessions = sessions.filter(
        (errorSession) => errorSession.alpVersion === latest[errorSession.bannerId],
      );
      setData(filterdSessions);
    } else {
      setData(sessions);
    }
  }, [latestOTA, sessions, latest]);

  return (
    <DataTable columns={columns} data={data}>
      <div className="space-y-4">
        <div className="flex gap-2">
          <SearchBar
            searchColumnName="bannerName"
            searchPlaceholder="Search by merchant name"
          />
          <Filter columnName={"priority"} title="Priority" options={PRIORITY_OPTIONS} />
          <Filter columnName={"platform"} title="Platforms" options={PLATFORM_OPTIONS} />
          <OnlyLatestSwitch />
        </div>
        <Table />
        <Pagination />
      </div>
    </DataTable>
  );
}
