'use client'
import { Home, ListOrdered, BarChart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type Screen = 'dashboard' | 'transactions'

interface BottomNavProps {
  currentScreen: Screen
  onScreenChange: (screen: Screen) => void
}

const BottomNav = ({ currentScreen, onScreenChange }: BottomNavProps) => {
  return (
    <div className='fixed bottom-16 left-1/2 -translate-x-1/2 w-auto max-w-sm'>
      <nav className='flex gap-2 p-2 bg-background/80 dark:bg-background/50 backdrop-blur-lg rounded-xl shadow-lg border border-border'>
        <Button
          variant='ghost'
          size='icon'
          onClick={() => onScreenChange('dashboard')}
          className={cn(
            'h-9 w-9',
            currentScreen === 'dashboard' && 'text-primary bg-muted'
          )}>
          <BarChart className='h-[18px] w-[18px]' />
        </Button>

        <Button
          variant='ghost'
          size='icon'
          onClick={() => onScreenChange('transactions')}
          className={cn(
            'h-9 w-9',
            currentScreen === 'transactions' && 'text-primary bg-muted'
          )}>
          <ListOrdered className='h-[18px] w-[18px]' />
        </Button>
      </nav>
    </div>
  )
}

export default BottomNav
