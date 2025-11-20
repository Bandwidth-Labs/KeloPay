// useTransactions hook - Fetches paginated transaction history
// Integrates with React Query for caching and Reown AppKit for wallet info

'use client'

import { useQuery } from '@tanstack/react-query'
import { useAppKitAccount } from '@reown/appkit/react'
import { TransactionsResponse, TransactionType, TransactionStatus } from '@/types/analytics'

interface UseTransactionsOptions {
  page?: number
  limit?: number
  type?: TransactionType
  status?: TransactionStatus
  network?: string
  enabled?: boolean
}

/**
 * Hook to fetch transaction history from backend API
 * Supports pagination and filtering
 * Integrates with Reown AppKit for wallet authentication
 *
 * @param options - Transaction query options
 * @returns React Query result with transactions and pagination
 */
export function useTransactions(options: UseTransactionsOptions = {}) {
  const { address, isConnected } = useAppKitAccount()
  const {
    page = 1,
    limit = 20,
    type,
    status,
    network,
    enabled = true,
  } = options

  return useQuery({
    queryKey: ['transactions', address, page, limit, type, status, network],
    queryFn: async (): Promise<TransactionsResponse> => {
      // Build query parameters
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      })

      if (type) params.append('type', type)
      if (status) params.append('status', status)
      if (network) params.append('network', network)

      // Call backend API
      const response = await fetch(`/api/transactions?${params}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })

      if (!response.ok) {
        throw new Error('Failed to fetch transactions')
      }

      const result = await response.json()
      return result.data
    },
    enabled: enabled && isConnected,
    staleTime: 2 * 60 * 1000, // 2 minutes
    placeholderData: (previousData) => previousData, // Keep previous data while fetching
  })
}
