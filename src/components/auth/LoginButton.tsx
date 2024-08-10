'use client'
import { Button } from '@/components/ui/button'
import { Session } from 'next-auth'
import { signIn, signOut } from 'next-auth/react'

const LoginButton = ({ session }: { session: Session | null }) => {
  if (session !== null && session.user)
    return (
      <>
        <p>You are signed in as {session.user.id}</p>
        <Button onClick={() => signOut()}>Logout</Button>
      </>
    )

  return <Button onClick={() => signIn('google')}>Login</Button>
}

export default LoginButton
