import * as SessionSchema from '@/actions/session/session.schema'
import { Button } from '@/components/ui/button'
import Tooltip from '@/components/ui/tooltip'
import { HardDriveDownload } from 'lucide-react'

type ActionRowCellProps = {
  session: SessionSchema.ErrorSession
  accessorValue: string
}

export default function ActionRowCell(props: ActionRowCellProps) {
  // const onOpenSheet = useFormSheetStore((s) => s.onOpenSheet);
  const handleOnClickGetSessionIds = (session: SessionSchema.ErrorSession) => {
    // onOpenSheet(ENROLL_PATIENT_FORM_SHEET_KEY);
    // useSelectedPatientStore.setState({ patient });
    console.log(session)
  }

  return (
    <div className='flex items-center gap-2'>
      <p>{props.accessorValue}</p>
      <div className='ml-auto flex gap-2 opacity-0 group-hover:opacity-100'>
        <Tooltip label='Get Session IDs'>
          <Button
            type='button'
            size='icon'
            variant='ghost'
            onClick={() => handleOnClickGetSessionIds(props.session)}
          >
            <HardDriveDownload size={16} />
          </Button>
        </Tooltip>
      </div>
    </div>
  )
}
