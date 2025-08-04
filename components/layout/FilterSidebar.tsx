'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, Filter, Sliders, Target, DollarSign, Clock, Users, TrendingUp } from 'lucide-react'
import { useState } from 'react'

interface FilterSidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function FilterSidebar({ isOpen, onClose }: FilterSidebarProps) {
  const [filters, setFilters] = useState({
    blockchain: 'all',
    riskLevel: 'all',
    minLiquidity: '',
    maxLiquidity: '',
    minAge: '',
    maxAge: '',
    minHolders: '',
    maxHolders: '',
    minVolume: '',
    maxVolume: ''
  })

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />
          
          {/* Sidebar */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed left-0 top-0 h-full w-80 glass-effect border-r border-white/10 z-50 overflow-y-auto"
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                  <Filter className="w-5 h-5 text-neon-blue" />
                  <h2 className="text-lg font-semibold">Filters</h2>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5 text-dark-300" />
                </button>
              </div>

              {/* Blockchain Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-dark-300 mb-2">
                  Blockchain
                </label>
                <select
                  value={filters.blockchain}
                  onChange={(e) => handleFilterChange('blockchain', e.target.value)}
                  className="w-full px-3 py-2 bg-dark-800/50 border border-dark-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-neon-blue text-white"
                >
                  <option value="all">All Blockchains</option>
                  <option value="ethereum">Ethereum</option>
                  <option value="bsc">Binance Smart Chain</option>
                  <option value="polygon">Polygon</option>
                  <option value="arbitrum">Arbitrum</option>
                </select>
              </div>

              {/* Risk Level Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-dark-300 mb-2">
                  Risk Level
                </label>
                <select
                  value={filters.riskLevel}
                  onChange={(e) => handleFilterChange('riskLevel', e.target.value)}
                  className="w-full px-3 py-2 bg-dark-800/50 border border-dark-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-neon-blue text-white"
                >
                  <option value="all">All Risk Levels</option>
                  <option value="low">Low Risk (0-30)</option>
                  <option value="medium">Medium Risk (31-60)</option>
                  <option value="high">High Risk (61-80)</option>
                  <option value="extreme">Extreme Risk (81-100)</option>
                </select>
              </div>

              {/* Liquidity Range */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-dark-300 mb-2 flex items-center">
                  <DollarSign className="w-4 h-4 mr-1" />
                  Liquidity Range (USD)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={filters.minLiquidity}
                    onChange={(e) => handleFilterChange('minLiquidity', e.target.value)}
                    className="px-3 py-2 bg-dark-800/50 border border-dark-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-neon-blue text-white"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={filters.maxLiquidity}
                    onChange={(e) => handleFilterChange('maxLiquidity', e.target.value)}
                    className="px-3 py-2 bg-dark-800/50 border border-dark-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-neon-blue text-white"
                  />
                </div>
              </div>

              {/* Age Range */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-dark-300 mb-2 flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  Age Range (Days)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={filters.minAge}
                    onChange={(e) => handleFilterChange('minAge', e.target.value)}
                    className="px-3 py-2 bg-dark-800/50 border border-dark-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-neon-blue text-white"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={filters.maxAge}
                    onChange={(e) => handleFilterChange('maxAge', e.target.value)}
                    className="px-3 py-2 bg-dark-800/50 border border-dark-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-neon-blue text-white"
                  />
                </div>
              </div>

              {/* Holders Range */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-dark-300 mb-2 flex items-center">
                  <Users className="w-4 h-4 mr-1" />
                  Holders Range
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={filters.minHolders}
                    onChange={(e) => handleFilterChange('minHolders', e.target.value)}
                    className="px-3 py-2 bg-dark-800/50 border border-dark-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-neon-blue text-white"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={filters.maxHolders}
                    onChange={(e) => handleFilterChange('maxHolders', e.target.value)}
                    className="px-3 py-2 bg-dark-800/50 border border-dark-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-neon-blue text-white"
                  />
                </div>
              </div>

              {/* Volume Range */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-dark-300 mb-2 flex items-center">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  Volume Range (USD)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={filters.minVolume}
                    onChange={(e) => handleFilterChange('minVolume', e.target.value)}
                    className="px-3 py-2 bg-dark-800/50 border border-dark-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-neon-blue text-white"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={filters.maxVolume}
                    onChange={(e) => handleFilterChange('maxVolume', e.target.value)}
                    className="px-3 py-2 bg-dark-800/50 border border-dark-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-neon-blue text-white"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button className="w-full px-4 py-2 bg-neon-blue/20 text-neon-blue border border-neon-blue/30 rounded-lg hover:bg-neon-blue/30 transition-colors">
                  Apply Filters
                </button>
                <button 
                  onClick={() => setFilters({
                    blockchain: 'all',
                    riskLevel: 'all',
                    minLiquidity: '',
                    maxLiquidity: '',
                    minAge: '',
                    maxAge: '',
                    minHolders: '',
                    maxHolders: '',
                    minVolume: '',
                    maxVolume: ''
                  })}
                  className="w-full px-4 py-2 bg-dark-600/50 text-dark-300 border border-dark-600 rounded-lg hover:bg-dark-600/70 transition-colors"
                >
                  Clear All
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
} 