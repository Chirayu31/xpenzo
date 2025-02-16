import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Transaction } from '@/types/transaction'
import { TransactionType } from '@prisma/client'
import { TrendingUp, Wallet } from 'lucide-react'

interface QuickStatsProps {
  transactions: Transaction[]
}

const QuickStats = ({ transactions }: QuickStatsProps) => {
  const expenseTransactions = transactions?.filter(
    (t) => t.type === TransactionType.EXPENSE
  )

  const getTopCategoryExpenses = () => {
    const categoryTotal: { [key: string]: number } = {}
    expenseTransactions?.forEach((transaction) => {
      const category = transaction.category
      categoryTotal[category.title] =
        (categoryTotal[category.title] || 0) + transaction.amount
    })
    return Object.entries(categoryTotal)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
  }

  const getTopThreeExpenses = () => {
    return expenseTransactions?.sort((a, b) => b.amount - a.amount).slice(0, 3)
  }

  const topCategories = getTopCategoryExpenses()
  const topExpenses = getTopThreeExpenses()

  return (
    <div className='grid gap-4 grid-cols-1 md:grid-cols-2 my-4'>
      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>
            Top 3 Spending Categories
          </CardTitle>
          <Wallet className='h-4 w-4 text-muted-foreground' />
        </CardHeader>
        <CardContent>
          {topCategories.map(([category, amount], index) => (
            <div key={category} className='mb-2'>
              <div className='text-lg font-bold'>{category}</div>
              <div className='text-xs text-muted-foreground flex items-center gap-1'>
                ₹ {amount.toLocaleString('en-IN')}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>
            Top 3 Largest Expenses
          </CardTitle>
          <TrendingUp className='h-4 w-4 text-muted-foreground' />
        </CardHeader>
        <CardContent>
          {topExpenses?.map((expense, index) => (
            <div key={expense.id} className='mb-2'>
              <div className='text-lg font-bold'>{expense.description}</div>
              <div className='text-xs text-muted-foreground flex items-center gap-1'>
                ₹ {expense.amount.toLocaleString('en-IN')}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

export default QuickStats
