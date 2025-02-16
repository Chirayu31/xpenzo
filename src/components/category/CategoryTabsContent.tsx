import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Trash2 } from 'lucide-react'
import { category } from '@/types/category'
import { convertToSentenceCase } from '@/utils/commonUtility'
import { useMutation } from '@tanstack/react-query'
import { useToast } from '@/hooks/use-toast'
import apiCaller from '@/utils/apiCaller'

interface CategoryTabsContentProps {
  type: string
  categories?: category[]
  refetchCategories: () => void
}

const CategoryItem: React.FC<{
  category: category
  refetchCategories: () => void
}> = ({ category, refetchCategories }) => {
  const { toast } = useToast()
  const deleteCategoryMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiCaller.delete(`/api/category/${id}`)
    },
    onSuccess: () => {
      refetchCategories()
    },
    onError: (error) => {
      toast({ title: 'Some error occured' })
    },
  })

  const handleDeleteCategory = () => {
    deleteCategoryMutation.mutate(category.id)
  }

  return (
    <div
      className={`p-2 hover:bg-accent rounded-md flex justify-between items-center ${
        deleteCategoryMutation.isPending
          ? 'opacity-50 blur-[1px] bg-red-300'
          : ''
      }`}>
      <span>{category.title}</span>
      {!category.isDefault && (
        <Button
          variant='ghost'
          size='icon'
          onClick={handleDeleteCategory}
          disabled={deleteCategoryMutation.isPending}
          className='h-8 w-8'>
          <Trash2 className='h-4 w-4' />
        </Button>
      )}
    </div>
  )
}

const CategoryTabsContent: React.FC<CategoryTabsContentProps> = ({
  type,
  categories = [],
  refetchCategories,
}) => {
  const filteredCategories = categories.filter(
    (category) => category.type === type
  )

  const renderCategories = () => {
    if (!categories.length) {
      return <p className='text-muted-foreground'>No categories added yet</p>
    }

    if (!filteredCategories.length) {
      return (
        <p className='text-muted-foreground'>
          No categories found for {convertToSentenceCase(type)}
        </p>
      )
    }

    return filteredCategories.map((category) => (
      <CategoryItem
        key={category.id}
        category={category}
        refetchCategories={refetchCategories}
      />
    ))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{convertToSentenceCase(type)}</CardTitle>
      </CardHeader>
      <CardContent>{renderCategories()}</CardContent>
    </Card>
  )
}

export default CategoryTabsContent
