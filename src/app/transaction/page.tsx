'use client'
import TransactionContainer from '@/components/transactions/TransactionContainer'
import TransactionHeader from '@/components/transactions/TransactionHeader'
import Error500 from '@/components/ui/error'
import Loader from '@/components/ui/loader'
import BottomNav from '@/components/transactions/BottomNav'
import { Transaction } from '@/types/transaction'
import apiCaller from '@/utils/apiCaller'
import { TransactionType } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import { startOfMonth } from 'date-fns'
import React from 'react'
import { DateRange } from 'react-day-picker'
import Dashboard from '@/components/dashboard/Dashboard'

type Screen = 'dashboard' | 'transactions'

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
  const [currentScreen, setCurrentScreen] =
    React.useState<Screen>('transactions')
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

  const renderScreen = () => {
    switch (currentScreen) {
      case 'dashboard':
        return (
          <Dashboard
            transactions={transactions}
            incomeAmount={incomeAmount}
            expenseAmount={expenseAmount}
            savingsAmount={savingsAmount}
            investmentAmount={investmentAmount}
          />
        )
      case 'transactions':
        return (
          <div className='mt-5 mx-2 md:mx-24 pb-20'>
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
  }

  if (isTransactionLoading) {
    return (
      <>
        <Loader />
      </>
    )
  }

  if (isTransactionError) {
    return (
      <>
        <Error500 />
      </>
    )
  }

  if (transactions?.length === 0) {
    return (
      <>
        <div className='flex justify-center items-center h-96'>
          <p className='text-lg font-semibold'>No transactions added yet.</p>
        </div>
      </>
    )
  }

  return (
    <div className='mb-24'>
      {renderScreen()}
      <BottomNav
        currentScreen={currentScreen}
        onScreenChange={setCurrentScreen}
      />
    </div>
  )
}

export default ViewTransactions
