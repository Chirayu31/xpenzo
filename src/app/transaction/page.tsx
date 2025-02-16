'use client'
import TransactionContainer from '@/components/transactions/TransactionContainer'
import TransactionHeader from '@/components/transactions/TransactionHeader'
import Error500 from '@/components/ui/error'
import Loader from '@/components/ui/loader'
import { Transaction } from '@/types/transaction'
import apiCaller from '@/utils/apiCaller'
import { TransactionType } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import { startOfMonth } from 'date-fns'
import React from 'react'
import { DateRange } from 'react-day-picker'

const calculateTransactionAmount = (
  transactions: Transaction[] | undefined,
  type: TransactionType
): number => {
  return (
    transactions
      ?.filter((t) => t.type === type)
      .reduce((acc, curr) => acc + curr.amount, 0) || 0
  )
}

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

  const incomeAmount = calculateTransactionAmount(
    transactions,
    TransactionType.INCOME
  )
  const expenseAmount = calculateTransactionAmount(
    transactions,
    TransactionType.EXPENSE
  )
  const savingsAmount = calculateTransactionAmount(
    transactions,
    TransactionType.SAVINGS
  )
  const investmentAmount = calculateTransactionAmount(
    transactions,
    TransactionType.INVESTMENT
  )

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
        incomeAmount={incomeAmount}
        expenseAmount={expenseAmount}
        savingsAmount={savingsAmount}
        investmentAmount={investmentAmount}
      />
      <TransactionContainer transactions={transactions} />
    </div>
  )
}

export default ViewTransactions
