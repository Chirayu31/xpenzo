import React from 'react'
import { DatePickerWithRange } from './date-range-picker'
import { DateRange } from 'react-day-picker'
import { CreditCard, TrendingDown, TrendingUp } from 'lucide-react'

interface TransactionHeaderProps {
  setDates: React.Dispatch<React.SetStateAction<DateRange | undefined>>
  dates: DateRange | undefined
  transactionCount?: number
  incomeAmount?: number
  expenseAmount?: number
}

const TransactionHeader: React.FC<TransactionHeaderProps> = ({
  setDates,
  dates,
  transactionCount = 0,
  incomeAmount,
  expenseAmount,
}) => {
  return (
    <div className='bg-gradient-to-r from-slate-50 to-white dark:from-slate-900 dark:to-black p-4 rounded-lg'>
      <div className='flex flex-col sm:flex-row gap-4 sm:items-center justify-between'>
        <div className='flex items-center gap-3'>
          <div className='bg-blue-100 dark:bg-black p-2 rounded-full'>
            <CreditCard className='h-6 w-6 text-slate-600 dark:text-slate-300' />
          </div>
          <div>
            <h2 className='text-xl font-medium text-slate-800 dark:text-slate-200'>
              My Transactions
            </h2>
            <p className='text-sm text-slate-500'>
              {transactionCount}{' '}
              {transactionCount === 1 ? 'transaction' : 'transactions'} this
              period
            </p>
          </div>
        </div>

        <div className='flex justify-center items-center gap-3'>
          <div className='flex items-center gap-1'>
            <TrendingUp className='h-6 w-6 text-green-500 dark:text-green-300' />
            <p className='text-sm text-green-500 dark:text-green-300'>
              ₹ {incomeAmount}
            </p>
          </div>

          <div className='flex items-center gap-1'>
            <TrendingDown className='h-6 w-6 text-red-500 dark:text-red-300' />
            <p className='text-sm text-red-500 dark:text-red-300'>
              ₹ {expenseAmount}
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
