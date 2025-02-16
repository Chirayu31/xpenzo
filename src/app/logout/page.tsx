'use client'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function LogoutPage() {
  const router = useRouter()

  useEffect(() => {
    const performLogout = async () => {
      await signOut({ redirect: false })
      router.push('/')
    }

    performLogout()
  }, [router])

  return (
    <div className='flex items-center justify-center min-h-screen'>
      <p>Logging out...</p>
    </div>
  )
}
