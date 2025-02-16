'use client'
import TransactionCard from '@/components/transactions/edit/TransactionCard'
import TransactionForm from '@/components/transactions/edit/TransactionForm'
import Error500 from '@/components/ui/error'
import Loader from '@/components/ui/loader'
import apiCaller from '@/utils/apiCaller'
import { EditTransactionSchema } from '@/validation/transactions'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import { notFound } from 'next/navigation'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const EditTransaction = ({ params }: { params: { id: string } }) => {
  const id = params.id

  const { data, isLoading, isError } = useQuery({
    queryKey: ['transaction', id],
    queryFn: async () => await apiCaller.get(`/api/transactions/${id}`),
  })

  const editTransactionForm = useForm<z.infer<typeof EditTransactionSchema>>({
    resolver: zodResolver(EditTransactionSchema),
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
    return <Loader />
  }

  if (data === null) {
    return notFound()
  }

  if (isError) {
    return <Error500 />
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
