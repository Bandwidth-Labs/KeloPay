// useRoleAccess hook - Role-based access control with Reown AppKit
// Determines user permissions based on connected wallet address

'use client'

import { useMemo } from 'react'
import { useAppKitAccount } from '@reown/appkit/react'
import { UserRole } from '@/types/analytics'

interface RolePermissions {
  viewAllTransactions: boolean
  viewAllUsers: boolean
  viewAnalytics: boolean
  viewReports: boolean
  manageUsers: boolean
  manageMerchants: boolean
  exportData: boolean
  viewSettings: boolean
}

/**
 * Hook for role-based access control using Reown AppKit
 *
 * Determines user role based on connected wallet address
 * In production, this would be fetched from the backend API
 * For now, assigns roles based on wallet address pattern (demo)
 *
 * @param allowedRoles - Optional list of roles that have access
 * @returns Role access information and permissions
 */
export function useRoleAccess(allowedRoles?: UserRole[]) {
  const { address, isConnected } = useAppKitAccount() // Reown AppKit integration

  // Determine user role based on wallet address
  // TODO: In production, fetch this from backend API via /api/user/role
  const role = useMemo((): UserRole => {
    if (!address) return UserRole.USER

    // Demo: Assign roles based on address prefix
    // In production, this comes from database
    const addressLower = address.toLowerCase()

    if (addressLower.startsWith('0x00') || addressLower.startsWith('0x11')) {
      return UserRole.ADMIN
    }
    if (addressLower.startsWith('0x22') || addressLower.startsWith('0x33')) {
      return UserRole.OPERATIONS
    }
    if (addressLower.startsWith('0x44') || addressLower.startsWith('0x55')) {
      return UserRole.GROWTH
    }
    if (addressLower.startsWith('0x66') || addressLower.startsWith('0x77')) {
      return UserRole.MERCHANT
    }

    return UserRole.USER
  }, [address])

  // Calculate permissions based on role
  const permissions = useMemo((): RolePermissions => {
    const isAdmin = role === UserRole.ADMIN
    const isOperations = role === UserRole.OPERATIONS
    const isGrowth = role === UserRole.GROWTH
    const isMerchant = role === UserRole.MERCHANT

    return {
      viewAllTransactions: isAdmin || isOperations || isGrowth,
      viewAllUsers: isAdmin || isOperations || isGrowth,
      viewAnalytics: isAdmin || isOperations || isGrowth,
      viewReports: isAdmin || isOperations || isGrowth || isMerchant,
      manageUsers: isAdmin || isOperations,
      manageMerchants: isAdmin || isOperations,
      exportData: isAdmin || isOperations || isGrowth || isMerchant,
      viewSettings: true, // All users can view their own settings
    }
  }, [role])

  // Check if user has access based on allowed roles
  const hasAccess = useMemo(() => {
    if (!allowedRoles || allowedRoles.length === 0) return true
    if (!isConnected) return false
    return allowedRoles.includes(role)
  }, [allowedRoles, role, isConnected])

  return {
    role,
    permissions,
    hasAccess,
    isConnected,
    address,
  }
}
