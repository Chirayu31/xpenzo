import LoginButton from '@/components/auth/LoginButton'
import { getServerSession } from 'next-auth'
import authOptions from './api/auth/[...nextauth]/authOptions'

export default async function Home() {
  const session = await getServerSession(authOptions)

  return (
    <main className='w-full flex flex-col justify-center items-center'>
      <h1 className='mt-5 text-4xl'>Xpenzo</h1>
      <p className='mt-5 text-xl tracking-wide'>
        Best expense management tool on the planet
      </p>
      <LoginButton session={session} />
    </main>
  )
}
