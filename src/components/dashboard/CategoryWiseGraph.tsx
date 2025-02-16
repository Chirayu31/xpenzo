import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Transaction } from '@/types/transaction'
import { TransactionType } from '@prisma/client'
import { ChartContainer } from '../ui/chart'
import { type ChartConfig } from '@/components/ui/chart'
import { Bar, BarChart, XAxis } from 'recharts'

interface CategoryWiseGraphProps {
  transactions: Transaction[]
}

const chartConfig = {
  amount: {
    label: 'amount',
    color: '#2563eb',
  },
} satisfies ChartConfig

const CategoryWiseGraph = ({ transactions }: CategoryWiseGraphProps) => {
  const transactionsExceptIncome = transactions?.filter(
    (t) => t.type !== TransactionType.INCOME
  )
  const getCategoryWiseTotal = () => {
    const categoryWiseTotal: { [key: string]: number } = {}
    transactionsExceptIncome?.forEach((transaction: Transaction) => {
      const category = transaction.category.title
      categoryWiseTotal[category] =
        (categoryWiseTotal[category] || 0) + transaction.amount
    })

    return Object.entries(categoryWiseTotal).map(([category, amount]) => ({
      category,
      amount,
    }))
  }

  const data = getCategoryWiseTotal()

  return (
    <Card className='col-span-4 w-full'>
      <CardHeader>
        <CardTitle className='text-sm font-medium'>
          Category Wise Spends
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className='h-[200px] w-full'>
          <BarChart accessibilityLayer data={data}>
            <XAxis
              dataKey='category'
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <Bar dataKey='amount' fill='var(--color-amount)' radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export default CategoryWiseGraph
