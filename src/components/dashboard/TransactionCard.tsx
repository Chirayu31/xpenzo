import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { TransactionType } from '@prisma/client'
import { convertToSentenceCase } from '@/utils/commonUtility'

interface TransactionCardProps {
  transactionType: TransactionType
  amount: number
}

const TransactionCard: React.FC<TransactionCardProps> = ({
  transactionType,
  amount,
}) => {
  return (
    <Card className='w-full'>
      <CardHeader>
        <span className='text-gray-500 text-sm'>{`Total ${convertToSentenceCase(
          transactionType
        )}`}</span>
        <CardTitle>₹ {amount}</CardTitle>
      </CardHeader>
    </Card>
  )
}

export default TransactionCard
