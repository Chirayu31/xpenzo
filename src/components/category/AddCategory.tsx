'use client'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { Input } from '../ui/input'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { TransactionType } from '@prisma/client'
import { Button } from '../ui/button'
import { z } from 'zod'
import { CategorySchema } from '@/validation/category'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import apiCaller from '@/utils/apiCaller'
import { ADD_CATEGORY_ROUTE } from '@/constants/apiRoutes'
import { toDate } from 'date-fns'
import { useToast } from '@/hooks/use-toast'

interface AddCategoryProps {
  onCategoryAdded: () => void
}

const AddCategory: React.FC<AddCategoryProps> = ({ onCategoryAdded }) => {
  const form = useForm<z.infer<typeof CategorySchema>>({
    resolver: zodResolver(CategorySchema),
    defaultValues: {
      title: '',
      type: TransactionType.EXPENSE,
    },
  })
  const { toast } = useToast()
  const formMutation = useMutation({
    mutationFn: async (values: z.infer<typeof CategorySchema>) => {
      const response = await apiCaller.post(ADD_CATEGORY_ROUTE, values)
      return response
    },
    onSuccess: () => {
      onCategoryAdded()
      form.reset()
      toast({ title: 'Category added successfully' })
    },
    onError: (error: Error) => {
      console.log(error)
    },
  })

  const handleFormSubmit = async (data: z.infer<typeof CategorySchema>) => {
    try {
      await formMutation.mutateAsync(data)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Category</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleFormSubmit)}>
            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category Title</FormLabel>
                  <FormControl>
                    <Input placeholder='Utilities' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='type'
              render={({ field }) => (
                <FormItem className='space-y-3 mt-4'>
                  <FormLabel>Select category type</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className='flex items-center gap-4'>
                      <FormItem className='flex items-center space-x-3 space-y-0'>
                        <FormControl>
                          <RadioGroupItem value={TransactionType.EXPENSE} />
                        </FormControl>
                        <FormLabel className='font-normal'>Expense</FormLabel>
                      </FormItem>
                      <FormItem className='flex items-center space-x-3 space-y-0'>
                        <FormControl>
                          <RadioGroupItem value={TransactionType.INCOME} />
                        </FormControl>
                        <FormLabel className='font-normal'>Income</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type='submit'
              disabled={formMutation.isPending}
              className='mt-4'>
              {formMutation.isPending ? 'Submitting' : 'Submit'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default AddCategory
