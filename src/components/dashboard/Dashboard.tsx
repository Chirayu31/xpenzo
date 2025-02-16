import { Transaction } from '@/types/transaction'
import React from 'react'
import TransactionCard from './TransactionCard'
import { TransactionType } from '@prisma/client'
import QuickStats from './QuickStats'
import CategoryWiseGraph from './CategoryWiseGraph'
import TransactionTypeWiseGraph from './TransactionTypeWiseGraph'

interface DashboardProps {
  transactions: Transaction[]
  incomeAmount?: number
  expenseAmount?: number
  savingsAmount?: number
  investmentAmount?: number
}

const Dashboard: React.FC<DashboardProps> = ({
  transactions,
  expenseAmount = 0,
  incomeAmount = 0,
  savingsAmount = 0,
  investmentAmount = 0,
}) => {
  return (
    <div className='mx-2'>
      <div className='grid grid-cols-2 md:grid-cols-4 w-full my-4 gap-2'>
        <TransactionCard
          transactionType={TransactionType.EXPENSE}
          amount={expenseAmount}
        />
        <TransactionCard
          transactionType={TransactionType.INCOME}
          amount={incomeAmount}
        />
        <TransactionCard
          transactionType={TransactionType.SAVINGS}
          amount={savingsAmount}
        />
        <TransactionCard
          transactionType={TransactionType.INVESTMENT}
          amount={investmentAmount}
        />
      </div>
      <div>
        <QuickStats transactions={transactions} />
        <div className='flex max-md:flex-col gap-2'>
          <CategoryWiseGraph transactions={transactions} />
          <TransactionTypeWiseGraph transactions={transactions} />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
