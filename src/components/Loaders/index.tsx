import { LoaderCircle } from 'lucide-react'

type SpinnerProps = {
  message?: string
}

export function Spinner(props: SpinnerProps) {
  return (
    <div className='flex items-center justify-center h-full'>
      <div className='flex flex-col gap-2 items-center justify-center'>
        <LoaderCircle className='h-12 w-12 animate-spin' />
        <p className='text-sm text-muted-foreground italic'>{props.message}</p>
      </div>
    </div>
  )
}
