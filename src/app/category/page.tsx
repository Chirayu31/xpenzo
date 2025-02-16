'use client'
import CategoryHeader from '@/components/category/Header'
import CategoryTabs from '@/components/category/Tabs'
import React from 'react'

const Category = () => {
  return (
    <div className='mt-5 mx-2 md:mx-24'>
      <CategoryHeader />
      <div className='mt-4 rounded-lg shadow-sm'>
        <CategoryTabs />
      </div>
    </div>
  )
}

export default Category
