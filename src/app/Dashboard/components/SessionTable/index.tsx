import { SessionTableContainer } from "./SessionTableContainer";
import * as SessionServices from "@/actions/session/session.services";

export default async function SessionTable() {
  const errorSessions = await SessionServices.listErrorSessions();

  const latest: { [key: string]: string } = {};
  errorSessions.forEach((errorSession) => {
    const { bannerId, alpVersion } = errorSession; // Destructure banner_id and version

    if (!latest[bannerId]) {
      // If this bannerId doesn't exist in `latest`, set the current version
      latest[bannerId] = alpVersion;
    } else {
      const currentVersion = latest[bannerId];
      const currentParts = currentVersion.split(".").map(Number);
      const newParts = alpVersion.split(".").map(Number);

      // Compare the versions
      let isNewer = false;
      for (let i = 0; i < currentParts.length; i++) {
        if (newParts[i] > currentParts[i]) {
          isNewer = true;
          break;
        } else if (newParts[i] < currentParts[i]) {
          break;
        }
      }

      // If new version is newer, update it
      if (isNewer) {
        latest[bannerId] = alpVersion;
      }
    }
  });

  return <SessionTableContainer sessions={errorSessions} latest={latest} />;
}
