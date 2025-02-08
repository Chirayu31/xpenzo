'use client'
import TransactionContainer from '@/components/transactions/TransactionContainer'
import TransactionHeader from '@/components/transactions/TransactionHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import apiCaller from '@/utils/apiCaller'
import { TransactionType } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import { startOfMonth } from 'date-fns'
import React from 'react'
import { DateRange } from 'react-day-picker'

const ViewTransactions = () => {
  const [dates, setDates] = React.useState<DateRange | undefined>({
    from: startOfMonth(new Date()),
    to: new Date(),
  })

  const {
    isLoading: isTransactionLoading,
    isError: isTransactionError,
    data: transactions,
    error: transactionError,
  } = useQuery({
    queryKey: ['transactions', dates],
    queryFn: async () => {
      if (!dates?.from || !dates?.to) return null
      return await apiCaller.get(
        `/api/transactions?startDate=${dates.from}&endDate=${dates.to}`
      )
    },
    enabled: !!dates?.from && !!dates?.to,
  })

  if (isTransactionLoading) {
    return <p>Loading...</p>
  }

  return (
    <div className='m-10'>
      <TransactionHeader dates={dates} setDates={setDates} />
      <TransactionContainer transactions={transactions} />
    </div>
  )
}

export default ViewTransactions
