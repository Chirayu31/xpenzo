'use client'
import { Button } from '@/components/ui/button'
import { Session } from 'next-auth'
import { signIn, signOut } from 'next-auth/react'

const LoginButton = ({ session }: { session: Session | null }) => {
  console.log(session)
  if (session !== null && session.user && session.user.name)
    return (
      <>
        <p>You are signed in as {session.user?.name}</p>
        <Button onClick={() => signOut()}>Logout</Button>
      </>
    )

  return <Button onClick={() => signIn('google')}>Login</Button>
}

export default LoginButton
