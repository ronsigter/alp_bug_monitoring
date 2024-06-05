import Image from 'next/image'
import DataTable from './components/DataTable'

export default async function HomePage() {
  return (
    <>
      <div className='md:hidden'>
        <Image
          src='/examples/tasks-light.png'
          width={1280}
          height={998}
          alt='Playground'
          className='block dark:hidden'
        />
        <Image
          src='/examples/tasks-dark.png'
          width={1280}
          height={998}
          alt='Playground'
          className='hidden dark:block'
        />
      </div>
      <div className='hidden h-full flex-1 flex-col space-y-8 p-8 md:flex'>
        <div className='flex items-center justify-between space-y-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>Welcome back!</h2>
            <p className='text-muted-foreground'>
              Bug Monitoring Hunt for today {new Date().toLocaleDateString()}
            </p>
          </div>
          {/* <div className="flex items-center space-x-2">
            <UserNav />
          </div> */}
        </div>
        <DataTable />
      </div>
    </>
  )
}
