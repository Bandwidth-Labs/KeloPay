// useAnalytics hook - Fetches dashboard analytics data
// Integrates with React Query for caching and Reown AppKit for wallet info

'use client'

import { useQuery } from '@tanstack/react-query'
import { useAppKitAccount } from '@reown/appkit/react'
import { DashboardData, FilterConfig } from '@/types/analytics'

interface UseAnalyticsOptions {
  granularity?: 'hourly' | 'daily' | 'weekly' | 'monthly'
  daysBack?: number
  filters?: FilterConfig
  enabled?: boolean
}

/**
 * Hook to fetch analytics dashboard data from backend API
 * Integrates with Reown AppKit for wallet authentication
 *
 * @param options - Analytics query options
 * @returns React Query result with dashboard data
 */
export function useAnalytics(options: UseAnalyticsOptions = {}) {
  const { address, isConnected } = useAppKitAccount()
  const {
    granularity = 'daily',
    daysBack = 30,
    filters,
    enabled = true,
  } = options

  return useQuery({
    queryKey: ['analytics', 'dashboard', address, granularity, daysBack, filters],
    queryFn: async (): Promise<DashboardData> => {
      // Build query parameters
      const params = new URLSearchParams({
        granularity,
        daysBack: daysBack.toString(),
      })

      // Call backend API
      const response = await fetch(`/api/analytics/overview?${params}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })

      if (!response.ok) {
        throw new Error('Failed to fetch analytics data')
      }

      const result = await response.json()
      return result.data
    },
    enabled: enabled && isConnected,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 60 * 1000, // Refetch every minute for updated data
  })
}
