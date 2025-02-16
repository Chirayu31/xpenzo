import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Transaction } from '@/types/transaction'
import { TransactionType } from '@prisma/client'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '../ui/chart'
import { type ChartConfig } from '@/components/ui/chart'
import { Bar, BarChart, Pie, PieChart, XAxis } from 'recharts'

interface TransactionTypeWiseGraphProps {
  transactions: Transaction[]
}

const chartConfig = {
  expense: {
    label: 'Expense',
    color: '#ef4444',
  },
  savings: {
    label: 'Savings',
    color: '#3b82f6',
  },
  investment: {
    label: 'Investment',
    color: '#8b5cf6',
  },
} satisfies ChartConfig

const TransactionTypeWiseGraph = ({
  transactions,
}: TransactionTypeWiseGraphProps) => {
  const transactionsExceptIncome = transactions?.filter(
    (t) => t.type !== TransactionType.INCOME
  )
  const getTypeWiseTotal = () => {
    const typeWiseTotal: { [key: string]: number } = {}
    transactionsExceptIncome?.forEach((transaction: Transaction) => {
      const type = transaction.type.toLowerCase()
      typeWiseTotal[type] = (typeWiseTotal[type] || 0) + transaction.amount
    })

    return Object.entries(typeWiseTotal).map(([type, amount]) => ({
      type: type,
      amount,
      fill: 'var(--color-' + type + ')',
    }))
  }

  const data = getTypeWiseTotal()
  console.log(data)
  return (
    <Card className='col-span-4 w-full'>
      <CardHeader>
        <CardTitle className='text-sm font-medium'>
          Transaction Distribution by Type
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className='h-[200px] w-full'>
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie data={data} dataKey='amount' nameKey='type' innerRadius={50} />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export default TransactionTypeWiseGraph
