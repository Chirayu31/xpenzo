import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const TransactionCard: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <Card className='w-full sm:w-[400px] md:w-[500px] lg:w-[600px] '>
      <CardHeader>
        <CardTitle>Edit Transaction</CardTitle>
        <CardDescription>Edit the details of your transaction.</CardDescription>
      </CardHeader>
      <CardContent className='max-sm:p-4'>{children}</CardContent>
    </Card>
  )
}

export default TransactionCard
