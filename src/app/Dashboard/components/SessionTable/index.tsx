import { SessionTableContainer } from "./SessionTableContainer";
import * as SessionServices from "@/actions/session/session.services";

export default async function SessionTable() {
  const errorSessions = await SessionServices.listErrorSessions();

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

  return <SessionTableContainer sessions={errorSessions} latest={latest} />;
}
