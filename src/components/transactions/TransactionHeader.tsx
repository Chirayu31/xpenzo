import React from 'react'
import { DatePickerWithRange } from './date-range-picker'
import { DateRange } from 'react-day-picker'
import { CreditCard, TrendingUp } from 'lucide-react'

interface TransactionHeaderProps {
  setDates: React.Dispatch<React.SetStateAction<DateRange | undefined>>
  dates: DateRange | undefined
  transactionCount?: number
}

const TransactionHeader: React.FC<TransactionHeaderProps> = ({
  setDates,
  dates,
  transactionCount = 0,
}) => {
  return (
    <div className='bg-gradient-to-r from-slate-50 to-white p-4 rounded-lg'>
      <div className='flex flex-col sm:flex-row gap-4 sm:items-center justify-between'>
        <div className='flex items-center gap-3'>
          <div className='bg-purple-100 p-2 rounded-full'>
            <CreditCard className='h-6 w-6 text-slate-600' />
          </div>
          <div>
            <h2 className='text-xl font-medium text-slate-800'>
              My Transactions
            </h2>
            <p className='text-sm text-slate-500'>
              {transactionCount}{' '}
              {transactionCount === 1 ? 'transaction' : 'transactions'} this
              period
            </p>
          </div>
        </div>

        <DatePickerWithRange
          dates={dates}
          setDates={setDates}
          className='bg-white shadow-sm border border-slate-200 rounded-md'
        />
      </div>
    </div>
  )
}

export default TransactionHeader
