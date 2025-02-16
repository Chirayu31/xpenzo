'use client'

import * as React from 'react'
import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'
import { DateRange } from 'react-day-picker'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

interface DatePickerRangeProps {
  setDates: React.Dispatch<React.SetStateAction<DateRange | undefined>>
  dates: DateRange | undefined
  className?: string
}

export function DatePickerWithRange({
  className,
  dates,
  setDates,
}: DatePickerRangeProps) {
  return (
    <div className={cn('grid gap-4', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id='date'
            variant={'outline'}
            className={cn(
              'min-w-[240px] w-full sm:w-[260px] justify-start text-left font-normal',
              !dates && 'text-muted-foreground'
            )}>
            <CalendarIcon className='h-4 md:w-4 opacity-50 mr-2' />
            {dates?.from ? (
              dates.to ? (
                <>
                  {format(dates.from, 'LLL dd, y')} -{' '}
                  {format(dates.to, 'LLL dd, y')}
                </>
              ) : (
                format(dates.from, 'LLL dd, y')
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-auto p-0' align='start'>
          <Calendar
            initialFocus
            mode='range'
            defaultMonth={dates?.from}
            selected={dates}
            onSelect={setDates}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
