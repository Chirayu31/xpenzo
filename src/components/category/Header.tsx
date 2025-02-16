import { Folders } from 'lucide-react'
import React from 'react'

const CategoryHeader = () => {
  return (
    <div className='bg-gradient-to-r from-slate-50 to-white dark:from-slate-900 dark:to-black p-4 rounded-lg'>
      <div className='flex flex-col sm:flex-row gap-4 sm:items-center justify-between'>
        <div className='flex items-center gap-3'>
          <div className='bg-blue-100 dark:bg-black p-2 rounded-full'>
            <Folders className='h-6 w-6 text-slate-600 dark:text-slate-300' />
          </div>
          <div>
            <h2 className='text-xl font-medium text-slate-800 dark:text-slate-200'>
              My Categories
            </h2>
            <p className='text-sm text-slate-500'>
              Manage your transaction categories to better organize your
              financial activities.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CategoryHeader
