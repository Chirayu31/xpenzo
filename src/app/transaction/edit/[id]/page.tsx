'use client'
import TransactionCard from '@/components/transactions/edit/TransactionCard'
import TransactionForm from '@/components/transactions/edit/TransactionForm'
import apiCaller from '@/utils/apiCaller'
import { EditTransactionSchema } from '@/validation/transactions'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const EditTransaction = ({ params }: { params: { id: string } }) => {
  const id = params.id

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['transaction', id],
    queryFn: async () => await apiCaller.get(`/api/transactions/${id}`),
  })

  const editTransactionForm = useForm<z.infer<typeof EditTransactionSchema>>({
    resolver: zodResolver(EditTransactionSchema),
    defaultValues: {
      date: data,
      description: '',
      amount: 0,
    },
  })

  useEffect(() => {
    if (data) {
      editTransactionForm.reset({
        date: new Date(data.createdAt),
        description: data.description,
        amount: data.amount,
        category_id: data.categoryId.toString(),
        type: data.type,
        id: data.id,
      })
    }
  }, [data, editTransactionForm])

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (isError) {
    return <p>Transaction Not Found</p>
  }

  return (
    <div className='my-10 flex justify-center'>
      <TransactionCard>
        <TransactionForm form={editTransactionForm} />
      </TransactionCard>
    </div>
  )
}

export default EditTransaction
