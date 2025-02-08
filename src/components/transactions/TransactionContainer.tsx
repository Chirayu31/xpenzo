import React from 'react'
import TransactionCard from './TransactionCard'
import { Transaction } from '@/types/transaction'

interface TransactionContainerProps {
  transactions: Transaction[]
}

const TransactionContainer: React.FC<TransactionContainerProps> = ({
  transactions,
}) => {
  return (
    <div className='flex-col w-full justify-items-center mt-10'>
      {transactions.map((transaction) => (
        <TransactionCard key={transaction.id} transaction={transaction} />
      ))}
    </div>
  )
}

export default TransactionContainer
