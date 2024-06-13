'use client'

import Modal from '@/components/Modal'
import { useSessionIdsStore } from '../../store/useSessionIdsStore'

export const SESSION_MODAL_ID = 'session-id-modal'

export default function SessionIdModal() {
  const selectedSession = useSessionIdsStore((state) => state.selectedSession)

  return (
    <Modal name={SESSION_MODAL_ID}>
      {selectedSession?.sessionIds.map((sessionId) => {
        return <div key={sessionId}>{sessionId}</div>
      })}
    </Modal>
  )
}
