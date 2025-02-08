import React from 'react'
import { DatePickerWithRange } from './date-range-picker'
import { DateRange } from 'react-day-picker'

interface TransactionHeaderProps {
  setDates: React.Dispatch<React.SetStateAction<DateRange | undefined>>
  dates: DateRange | undefined
}

const TransactionHeader: React.FC<TransactionHeaderProps> = ({
  setDates,
  dates,
}) => {
  return (
    <div className='flex gap-12 items-center'>
      <div>
        <h2 className='text-2xl font-semibold'>Transactions</h2>
        <p className='text-sm'>Manage your transactions.</p>
      </div>

      <div>
        <DatePickerWithRange dates={dates} setDates={setDates} />
      </div>
    </div>
  )
}

export default TransactionHeader
