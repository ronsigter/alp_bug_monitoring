import { Spinner } from '@/components/Loaders'
import SessionTable from './components/SessionTable'
import { Suspense } from 'react'

export default async function HomePage() {
  return (
    <div className='hidden h-full flex-1 flex-col space-y-8 p-8 md:flex'>
      <div className='flex items-center justify-between space-y-2'>
        <div>
          <h2 className='text-2xl font-bold tracking-tight'>Welcome back!</h2>
          <p className='text-muted-foreground'>
            Bug Monitoring for today {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
      <Suspense
        fallback={
          <div className='h-[500px]'>
            <Spinner message='Fetching data...' />
          </div>
        }
      >
        <SessionTable />
      </Suspense>
    </div>
  )
}
