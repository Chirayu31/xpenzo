import React from 'react'

interface LoaderProps {
  size?: 'small' | 'medium' | 'large'
  className?: string
}

const Loader: React.FC<LoaderProps> = ({ size = 'medium', className = '' }) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12',
  }

  return (
    <div
      className={`flex w-full min-h-screen items-center justify-center ${className}`}>
      <div
        className={`${sizeClasses[size]} border-4 border-gray-200 border-t-black rounded-full animate-spin`}
        role='status'
        aria-label='loading'
      />
    </div>
  )
}

export default Loader
