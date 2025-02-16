import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { TransactionType } from '@prisma/client'
import CategoryTabsContent from './CategoryTabsContent'
import AddCategory from './AddCategory'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import apiCaller from '@/utils/apiCaller'
import Loader from '../ui/loader'
import Error500 from '../ui/error'

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
    return <Loader />
  }

  if (isError) {
    return <Error500 />
  }

  return (
    <div className='flex w-full justify-center'>
      <Tabs
        className='w-full md:w-[500px]'
        defaultValue={TransactionType.EXPENSE}>
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
    </div>
  )
}

export default CategoryTabs
