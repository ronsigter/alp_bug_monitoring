import { useTransition } from "react";
import * as SessionSchema from "@/actions/session/session.schema";
import { Button } from "@/components/ui/button";
import Tooltip from "@/components/ui/tooltip";
import { FileTextIcon, HardDriveDownload, LoaderCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import * as SessionServices from "@/actions/session/session.services";
import { useSessionIdsStore } from "../../store/useSessionIdsStore";
import { useModalStore } from "@/components/Modal";
import { SESSION_MODAL_ID } from "../SessionIdModal";

type ActionRowCellProps = {
  session: SessionSchema.ErrorSession;
  accessorValue: string;
};

export default function ActionRowCell({ session, accessorValue }: ActionRowCellProps) {
  const { bannerId, resultMessage, alpVersion, bannerName } = session;
  const uniqueID = `${bannerId}-${resultMessage}-${alpVersion}`;
  const { sessionIds, onAddSessionIds } = useSessionIdsStore();
  const openModal = useModalStore(({ onOpenModal }) => onOpenModal);
  const [pending, startTransition] = useTransition();

  const handleOnClickGetSessionIds = (session: SessionSchema.ErrorSession) => {
    const { bannerId, resultMessage, alpVersion } = session;
    startTransition(async () => {
      const sessionIds = await SessionServices.listSessionIds({
        bannerId,
        resultMessage,
        alpVersion,
      });
      onAddSessionIds(uniqueID, {
        alpVersion,
        bannerId,
        resultMessage,
        sessionIds,
        bannerName,
      });

      toast.success("Session IDs fetched");
    });
  };

  const handleOnClickViewSessionIds = () => {
    const selectedSession = sessionIds.get(uniqueID);
    useSessionIdsStore.setState({ selectedSession: selectedSession });
    openModal(SESSION_MODAL_ID);
  };

  return (
    <div className="flex items-center gap-2">
      <p>{accessorValue}</p>
      <div
        className={cn("ml-auto flex gap-2 opacity-0 group-hover:opacity-100", {
          "opacity-100": pending || sessionIds.has(uniqueID),
        })}
      >
        {sessionIds.has(uniqueID) ? (
          <Tooltip label="View Fetched Session IDs">
            <Button type="button" size="icon" onClick={handleOnClickViewSessionIds}>
              <FileTextIcon size={16} />
            </Button>
          </Tooltip>
        ) : (
          <Tooltip label="Get Session IDs">
            <Button
              type="button"
              size="icon"
              variant="ghost"
              onClick={() => handleOnClickGetSessionIds(session)}
              disabled={pending}
            >
              {pending ? (
                <LoaderCircle className="animate-spin" size={16} />
              ) : (
                <HardDriveDownload size={16} />
              )}
            </Button>
          </Tooltip>
        )}
      </div>
    </div>
  );
}
