'use client'
import TransactionContainer from '@/components/transactions/TransactionContainer'
import TransactionHeader from '@/components/transactions/TransactionHeader'
import Error500 from '@/components/ui/error'
import Loader from '@/components/ui/loader'
import apiCaller from '@/utils/apiCaller'
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
    return <Loader />
  }

  if (isTransactionError) {
    return <Error500 />
  }

  return (
    <div className='mt-5 mx-2 md:mx-24 '>
      <TransactionHeader
        dates={dates}
        setDates={setDates}
        transactionCount={transactions?.length}
      />
      <TransactionContainer transactions={transactions} />
    </div>
  )
}

export default ViewTransactions
