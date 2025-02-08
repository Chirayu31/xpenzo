import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { TransactionType } from '@prisma/client'
import { stringToHexColor } from '@/utils/transactionUtility'
import { Transaction } from '@/types/transaction'

interface TransactionCardProps {
  transaction: Transaction
}

const TransactionCard = ({ transaction }: TransactionCardProps) => {
  const color = stringToHexColor(transaction.description)

  return (
    <Card className='py-2 w-[500px] border-0 hover:border-b-slate-100 hover:border-b-2 rounded-none cursor-pointer'>
      <CardContent className='flex-col py-0'>
        <div className='flex justify-between'>
          <div className='flex items-center gap-2'>
            <div
              className='w-6 h-6 rounded-full flex items-center justify-center'
              style={{
                backgroundImage: `linear-gradient(45deg, ${color} 0%, #000000 100%)`,
              }}></div>
            <p className='text-lg font-semibold'>{transaction.description}</p>
          </div>
          <p
            className={`
              ${
                transaction.type === TransactionType.EXPENSE
                  ? 'text-red-500'
                  : transaction.type === TransactionType.INCOME
                  ? 'text-green-500'
                  : ''
              } font-semibold`}>
            {`₹ ${transaction.amount}`}
          </p>
        </div>
        <div className='flex justify-between items-center'>
          <p className='text-xs text-gray-500'>
            {new Date(transaction.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

export default TransactionCard
