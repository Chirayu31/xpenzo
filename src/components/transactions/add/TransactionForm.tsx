import { UseFormReturn } from 'react-hook-form'
import { z } from 'zod'
import { AddTransactionModalSchema, AddSplitsSchema } from '@/validation/transactions'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { useState } from 'react'
import TransactionSplitForm from './split/TransactionSplitForm'
import { TransactionType } from '@prisma/client'

interface TransactionFormProps {
  form: UseFormReturn<z.infer<typeof AddTransactionModalSchema>>
}

const mockCategories = [
  { id: 1, name: 'Salary', type: TransactionType.INCOME },
  { id: 2, name: 'Rent', type: TransactionType.EXPENSE },
  { id: 3, name: 'Groceries', type: TransactionType.EXPENSE },
  { id: 4, name: 'Entertainment', type: TransactionType.EXPENSE },
  { id: 5, name: 'Utilities', type: TransactionType.EXPENSE },
  { id: 6, name: 'Investment', type: TransactionType.INCOME },
]

const TransactionForm: React.FC<TransactionFormProps> = ({ form }) => {
  const [isSplit, setIsSplit] = useState(false)
  const [splitData, setSplitData] = useState<z.infer<typeof AddSplitsSchema>>()

  const splitCheckHandler = (checked: boolean) => {
    setIsSplit(checked)
  }

  const getCategoryType = (categoryId: number) => {
    const transactionType = mockCategories.find(category => category.id === categoryId)?.type
    return transactionType
  }

  const handleFormSubmit = (data: z.infer<typeof AddTransactionModalSchema>) => {
    try{
      const transactionType = getCategoryType(data.category_id)
      data.type = transactionType
      
      if(splitData){
        // do something
        console.log(splitData)
      }

      console.log(data)

    }
    catch(e)
    {
      console.log(e)
    }
  }

  const handleFormInvalid = (data: any) => {
    try{
      console.log(data)
    }
    catch(e)
    {
      console.log(e)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit, handleFormInvalid)}  className='space-y-4'>
        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder='shadcn' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='grid grid-cols-1 sm:grid-cols-2 gap-2'>
          <FormField
            control={form.control}
            name='amount'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <Input type='number' placeholder='100' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='category_id'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger id='category'>
                      <SelectValue placeholder='Select category' />
                    </SelectTrigger>
                    <SelectContent>
                      {mockCategories.map((category) => (
                        <SelectItem
                          key={category.id}
                          value={category.id.toString()}
                          >
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name='date'
          render={({ field }) => (
            <FormItem className='flex flex-col'>
              <FormLabel>Date of Transaction</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'w-[240px] pl-3 text-left font-normal',
                        !field.value && 'text-muted-foreground'
                      )}>
                      {field.value ? (
                        format(field.value, 'PPP')
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className='w-auto p-0' align='start'>
                  <Calendar
                    mode='single'
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date('1900-01-01')
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        {isSplit && <TransactionSplitForm form={form} setSplitData={setSplitData} splitData={splitData} />}

        <div className='flex items-center space-x-2'>
          <Checkbox
            id='split-transaction'
            onCheckedChange={splitCheckHandler}
          />
          <Label htmlFor='split-transaction'>Split Transaction</Label>
        </div>

        <Button className='w-full' variant={'secondary'} type='submit'>
          Submit
        </Button>
      </form>
    </Form>
  )
}

export default TransactionForm
