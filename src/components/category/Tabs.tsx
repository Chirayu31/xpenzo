import React, { useEffect, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { TransactionType } from '@prisma/client'
import CategoryTabsContent from './CategoryTabsContent'
import AddCategory from './AddCategory'
import { category } from '@/types/category'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import apiCaller from '@/utils/apiCaller'

const Add = 'Add'

const CategoryTabs = () => {
  const queryClient = useQueryClient()

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['category'],
    queryFn: async () => await apiCaller.get('/api/category'),
  })

  const refetchCategories = () => {
    queryClient.invalidateQueries({ queryKey: ['category'] })
  }

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (isError) {
    return <p className='text-red-400'>Internal Server Error.</p>
  }

  return (
    <Tabs className='w-[500px] mt-8' defaultValue={TransactionType.EXPENSE}>
      <TabsList>
        <TabsTrigger value={TransactionType.EXPENSE}>Expense</TabsTrigger>
        <TabsTrigger value={TransactionType.INCOME}>Income</TabsTrigger>
        <TabsTrigger value={Add}>Add New</TabsTrigger>
      </TabsList>

      <TabsContent value={TransactionType.EXPENSE}>
        <CategoryTabsContent
          type={TransactionType.EXPENSE}
          categories={data}
          refetchCategories={refetchCategories}
        />
      </TabsContent>
      <TabsContent value={TransactionType.INCOME}>
        <CategoryTabsContent
          type={TransactionType.INCOME}
          categories={data}
          refetchCategories={refetchCategories}
        />
      </TabsContent>
      <TabsContent value={Add}>
        <AddCategory onCategoryAdded={refetchCategories} />
      </TabsContent>
    </Tabs>
  )
}

export default CategoryTabs
