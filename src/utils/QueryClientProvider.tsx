'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SessionProvider } from 'next-auth/react'
import React from 'react'

interface QueryClientProviderWrapperProps {
  children: React.ReactNode
}

const queryClient = new QueryClient()

const QueryClientProviderWrapper: React.FC<QueryClientProviderWrapperProps> = ({
  children,
}) => {
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </SessionProvider>
  )
}

export default QueryClientProviderWrapper
