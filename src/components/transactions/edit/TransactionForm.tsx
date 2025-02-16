import { UseFormReturn } from 'react-hook-form'
import { z } from 'zod'
import {
  AddSplitsSchema,
  EditTransactionSchema,
} from '@/validation/transactions'
import {
  Form,
  FormControl,
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
import { useState } from 'react'
import { TransactionType } from '@prisma/client'
import apiCaller from '@/utils/apiCaller'
import { useMutation, useQuery } from '@tanstack/react-query'
import { category } from '@/types/category'
import { useRouter } from 'next/navigation'

interface TransactionFormProps {
  form: UseFormReturn<z.infer<typeof EditTransactionSchema>>
}

const TransactionForm: React.FC<TransactionFormProps> = ({ form }) => {
  const [isSplit, setIsSplit] = useState(false)
  const [splitData, setSplitData] = useState<z.infer<typeof AddSplitsSchema>>()
  const router = useRouter()
  const {
    isLoading: categoryLoading,
    isError: isCategoryError,
    data: categories,
    error: categoryError,
  } = useQuery({
    queryKey: ['category'],
    queryFn: async () => await apiCaller.get('/api/category'),
  })

  const formMutation = useMutation({
    mutationFn: async (values: z.infer<typeof EditTransactionSchema>) => {
      const response = await apiCaller.put('/api/transactions', values)
      return response
    },
    onSuccess: () => {
      form.reset()
      router.push('/transaction')
    },
    onError: (error: Error) => {
      console.log(error)
    },
  })

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await apiCaller.delete(`/api/transactions/${id}`)
      return response
    },
    onSuccess: () => {
      form.reset()
      router.push('/transaction')
    },
    onError: (error: Error) => {
      console.log(error)
    },
  })

  const splitCheckHandler = (checked: boolean) => {
    setIsSplit(checked)
  }

  const getCategoryType = (categoryId: number) => {
    const transactionType: TransactionType | undefined = categories?.find(
      (category: category) => category.id === categoryId
    )?.type
    return transactionType
  }

  const handleFormSubmit = (data: z.infer<typeof EditTransactionSchema>) => {
    try {
      const transactionType = getCategoryType(data.category_id)
      data.type = transactionType
      formMutation.mutate(data)
    } catch (e) {
      console.log(e)
    }
  }

  const handleDeleteTransaction = () => {
    try {
      deleteMutation.mutate(form.getValues('id'))
    } catch (e) {
      console.log(e)
    }
  }

  const handleFormInvalid = (data: any) => {
    try {
      console.log(data)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleFormSubmit, handleFormInvalid)}
        className='space-y-4'>
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
            defaultValue={form.getValues('category_id')}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger id='category'>
                      <SelectValue placeholder='Select category' />
                    </SelectTrigger>
                    <SelectContent>
                      {categoryLoading && <p>Loading...</p>}

                      {categories && categories.length === 0 && (
                        <p className='px-2 text-sm'>No categories added yet</p>
                      )}

                      {categories &&
                        categories.length > 0 &&
                        categories.map((category: category) => (
                          <SelectItem
                            key={category.id}
                            value={category.id.toString()}>
                            {category.title}
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

        {/* {isSplit && (
          <TransactionSplitForm
            form={form}
            setSplitData={setSplitData}
            splitData={splitData}
          />
        )} */}

        {/* <div className='flex items-center space-x-2'>
          <Checkbox
            id='split-transaction'
            onCheckedChange={splitCheckHandler}
          />
          <Label htmlFor='split-transaction'>Split Transaction</Label>
        </div> */}
        <div className='flex gap-2'>
          <Button
            className='w-full'
            variant={'default'}
            type='submit'
            disabled={formMutation.isPending || deleteMutation.isPending}>
            {formMutation.isPending ? 'Submitting...' : 'Submit'}
          </Button>

          <Button
            className='w-full'
            variant={'destructive'}
            onClick={handleDeleteTransaction}
            type='button'
            disabled={formMutation.isPending || deleteMutation.isPending}>
            {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default TransactionForm
