import LoginButton from '@/components/auth/LoginButton'
import WaterflowText from '@/components/ui/WaterflowText'
import { getServerSession } from 'next-auth'
import authOptions from './api/auth/[...nextauth]/authOptions'
import { permanentRedirect } from 'next/navigation'

export default async function Home() {
  const session = await getServerSession(authOptions)

  if (session && session.user) {
    permanentRedirect('/transaction')
  }

  return (
    <main className='min-h-screen relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-background to-gray-900/20'>
      {/* Grid Background Pattern */}
      <div className='absolute inset-0 w-full h-full'>
        <div className='relative w-full h-full'>
          {/* Gradient Overlay */}
          <div className='absolute inset-0 bg-gradient-to-t from-background via-transparent to-background opacity-80' />

          {/* Vertical Lines */}
          <div
            className='absolute inset-0 flex justify-between w-full'
            style={{ gap: '1.5rem' }}>
            {Array.from({ length: 24 }).map((_, i) => (
              <div
                key={`v-${i}`}
                style={{ '--delay': i } as React.CSSProperties}
                className='h-full w-[1px] bg-gradient-to-b from-transparent via-gray-500/40 to-transparent animate-grid-line'
              />
            ))}
          </div>

          {/* Horizontal Lines */}
          <div
            className='absolute inset-0 flex flex-col justify-between h-full'
            style={{ gap: '1.5rem' }}>
            {Array.from({ length: 24 }).map((_, i) => (
              <div
                key={`h-${i}`}
                style={{ '--delay': i } as React.CSSProperties}
                className='w-full h-[1px] bg-gradient-to-r from-transparent via-gray-500/40 to-transparent animate-grid-line'
              />
            ))}
          </div>

          {/* Corner Overlay */}
          <div className='absolute inset-0 bg-gradient-to-br from-background/50 to-transparent' />
        </div>
      </div>

      {/* Content Container */}
      <div className='relative z-10 w-full text-center px-4'>
        <WaterflowText text='xpenzo' size='8xl' />
        <p className='text-xl md:text-2xl max-w-2xl mx-auto mt-5'>
          Creating a simpler world for managing your finances
        </p>
        <div className='mt-8'>
          <LoginButton />
        </div>
      </div>
    </main>
  )
}
