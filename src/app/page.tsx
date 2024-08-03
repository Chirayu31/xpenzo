'use client'
import { Button } from '@/components/ui/button'
import { signIn } from 'next-auth/react'

export default function Home() {
  return (
    <main className='w-full flex flex-col justify-center items-center'>
      <h1 className='mt-5 text-4xl'>Xpenzo</h1>
      <p className='mt-5 text-xl tracking-wide'>
        Best expense management tool on the planet
      </p>
      <Button onClick={() => signIn('google')}>Login</Button>
    </main>
  )
}
