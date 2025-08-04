'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Menu, 
  Search, 
  Bell, 
  Settings, 
  Wallet,
  Shield,
  TrendingUp,
  Activity
} from 'lucide-react'

interface DashboardHeaderProps {
  onMenuClick: () => void
}

export function DashboardHeader({ onMenuClick }: DashboardHeaderProps) {
  const [isConnected, setIsConnected] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <header className="glass-effect border-b border-white/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left side - Logo and Menu */}
          <div className="flex items-center space-x-4">
            <button
              onClick={onMenuClick}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              <Menu className="w-6 h-6 text-neon-blue" />
            </button>
            
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-neon rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold gradient-text">RugPull Detector</h1>
                <p className="text-xs text-dark-400">v1.0.0</p>
              </div>
            </div>
          </div>

          {/* Center - Search */}
          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-dark-400" />
              <input
                type="text"
                placeholder="Search tokens, contracts, or symbols..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-dark-800/50 border border-dark-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-neon-blue focus:border-transparent text-white placeholder-dark-400"
              />
            </div>
          </div>

          {/* Right side - Actions */}
          <div className="flex items-center space-x-3">
            {/* Status Indicators */}
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse"></div>
                <span className="text-xs text-dark-300">Live</span>
              </div>
              <div className="flex items-center space-x-1">
                <Activity className="w-4 h-4 text-neon-blue" />
                <span className="text-xs text-dark-300">1.2k tokens</span>
              </div>
            </div>

            {/* Notifications */}
            <button className="p-2 rounded-lg hover:bg-white/10 transition-colors relative">
              <Bell className="w-5 h-5 text-neon-blue" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-neon-red rounded-full"></div>
            </button>

            {/* Settings */}
            <button className="p-2 rounded-lg hover:bg-white/10 transition-colors">
              <Settings className="w-5 h-5 text-dark-300" />
            </button>

            {/* Connect Wallet */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsConnected(!isConnected)}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                isConnected
                  ? 'bg-neon-green/20 text-neon-green border border-neon-green/30'
                  : 'bg-neon-blue/20 text-neon-blue border border-neon-blue/30 hover:bg-neon-blue/30'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Wallet className="w-4 h-4" />
                <span>{isConnected ? 'Connected' : 'Connect Wallet'}</span>
              </div>
            </motion.button>
          </div>
        </div>
      </div>
    </header>
  )
} 