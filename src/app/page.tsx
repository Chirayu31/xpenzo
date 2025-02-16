import LoginButton from '@/components/auth/LoginButton'
import { getServerSession } from 'next-auth'
import authOptions from './api/auth/[...nextauth]/authOptions'
import { permanentRedirect } from 'next/navigation'

export default async function Home() {
  const session = await getServerSession(authOptions)

  if (session && session.user) {
    permanentRedirect('/transaction')
  }

  return (
    <main className='w-full mt-20 flex flex-col justify-center items-center '>
      <h1 className='text-4xl'>Xpenzo</h1>
      <p className='mt-5 text-xl tracking-wide'>
        Simple Expense Management Tool
      </p>
      <LoginButton />
    </main>
  )
}
