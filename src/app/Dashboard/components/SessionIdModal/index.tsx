"use client";

import Modal from "@/components/Modal";
import { useSessionIdsStore } from "../../store/useSessionIdsStore";
import { ScrollArea } from "@/components/ui/scroll-area";

export const SESSION_MODAL_ID = "session-id-modal";

export default function SessionIdModal() {
  const selectedSession = useSessionIdsStore((state) => state.selectedSession);

  return (
    <Modal name={SESSION_MODAL_ID}>
      <div className="flex flex-col gap-1">
        <p>Banner ID: {selectedSession?.bannerId}</p>
        <p>Banner Name: {selectedSession?.bannerName}</p>
        <p>Error Message: {selectedSession?.resultMessage}</p>
      </div>

      <ScrollArea className="h-72">
        {selectedSession?.sessionIds.map((sessionId) => {
          return <div key={sessionId}>{sessionId}</div>;
        })}
      </ScrollArea>
    </Modal>
  );
}
