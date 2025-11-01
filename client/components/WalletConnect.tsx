'use client'

import { useAccount, useDisconnect as useWagmiDisconnect } from 'wagmi'
import { useAppKitAccount, useAppKit, useDisconnect, useWalletInfo } from '@reown/appkit/react'
import { toast } from 'react-toastify'

export default function WalletConnect() {
  // AppKit hooks
  const { address: appkitAddress, isConnected: appkitIsConnected } = useAppKitAccount()
  const { open } = useAppKit()
  const { walletInfo } = useWalletInfo()
  const { disconnect: appkitDisconnect } = useDisconnect()
  
  // Wagmi hooks
  const { address: wagmiAddress, isConnected: wagmiIsConnected, connector } = useAccount()
  const { disconnect: wagmiDisconnect } = useWagmiDisconnect()
  
  const address = appkitAddress || wagmiAddress
  const isConnected = appkitIsConnected || wagmiIsConnected

  const handleConnect = async () => {
    try {
      await open()
    } catch (error) {
      console.error("Connection error:", error)
    }
  }

  const handleDisconnect = () => {
    try {
      if (appkitIsConnected) {
        appkitDisconnect()
      }
      if (wagmiIsConnected) {
        wagmiDisconnect()
      }
      toast.success('Wallet disconnected successfully')
    } catch (error) {
      console.error("Disconnect error:", error)
    }
  }

  const formatAddress = (addr: string | undefined) => {
    if (!addr) return ''
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  if (!isConnected) {
    return (
      <button
        onClick={handleConnect}
        className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-lg transition-all duration-200 font-semibold shadow-lg shadow-blue-500/50"
      >
        Connect Wallet
      </button>
    )
  }

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        <span className="text-sm font-mono text-gray-300">
          {formatAddress(address)}
        </span>
      </div>
      <button
        onClick={handleDisconnect}
        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors text-sm font-medium"
      >
        Disconnect
      </button>
    </div>
  )
}

