'use client'
import { AddTransactionModalSchema } from '@/validation/transactions'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import TransactionCard from '@/components/transactions/add/TransactionCard'
import TransactionForm from '@/components/transactions/add/TransactionForm'

const AddTransaction = () => {
  const addTransactionForm = useForm<z.infer<typeof AddTransactionModalSchema>>(
    {
      resolver: zodResolver(AddTransactionModalSchema),
      defaultValues: {
        date: new Date(),
        description: '',
        amount: 0
      },
    }
  )

  return (
    <div className='my-10 flex justify-center'>
      <TransactionCard>
        <TransactionForm form={addTransactionForm} />
      </TransactionCard>
    </div>
  )
}

export default AddTransaction
