import React from 'react'
import Link from 'next/link'

const Error500 = () => {
  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-gray-100'>
      <div className='text-center p-8'>
        <h1 className='text-6xl font-bold text-gray-800 mb-4'>500</h1>
        <h2 className='text-2xl font-semibold text-gray-600 mb-4'>
          Internal Server Error
        </h2>
        <p className='text-gray-500 mb-8'>
          Oops! Something went wrong on our servers.
        </p>
        <Link
          href='/'
          className='px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'>
          Return Home
        </Link>
      </div>
    </div>
  )
}

export default Error500
