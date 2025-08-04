'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TokenCard } from '@/components/tokens/TokenCard'
import { QuickActions } from '@/components/layout/QuickActions'
import { 
  Radar, 
  Zap, 
  TrendingUp, 
  AlertTriangle,
  RefreshCw,
  Filter,
  Grid,
  List
} from 'lucide-react'
import { TokenData } from '@/types/token'

// Mock data for demonstration
const mockTokens: TokenData[] = [
  {
    id: '1',
    name: 'SafeMoon Clone',
    symbol: 'SAFEMOON',
    contractAddress: '0x1234567890abcdef1234567890abcdef12345678',
    blockchain: 'ethereum',
    riskScore: 85,
    liquidity: 250000,
    marketCap: 5000000,
    holders: 1250,
    age: 2,
    volume24h: 150000,
    price: 0.00001234,
    priceChange24h: -15.5,
    isHoneypot: true,
    liquidityLocked: false,
    ownershipRenounced: false,
    hasProxy: true,
    socialScore: 25,
    lastUpdated: new Date()
  },
  {
    id: '2',
    name: 'Doge Inu',
    symbol: 'DOGEINU',
    contractAddress: '0xabcdef1234567890abcdef1234567890abcdef12',
    blockchain: 'bsc',
    riskScore: 45,
    liquidity: 500000,
    marketCap: 2000000,
    holders: 850,
    age: 5,
    volume24h: 75000,
    price: 0.00002345,
    priceChange24h: 8.2,
    isHoneypot: false,
    liquidityLocked: true,
    ownershipRenounced: true,
    hasProxy: false,
    socialScore: 65,
    lastUpdated: new Date()
  },
  {
    id: '3',
    name: 'Pepe Token',
    symbol: 'PEPE',
    contractAddress: '0x7890abcdef1234567890abcdef1234567890abcd',
    blockchain: 'ethereum',
    riskScore: 92,
    liquidity: 100000,
    marketCap: 800000,
    holders: 450,
    age: 1,
    volume24h: 25000,
    price: 0.00000123,
    priceChange24h: -45.8,
    isHoneypot: true,
    liquidityLocked: false,
    ownershipRenounced: false,
    hasProxy: true,
    socialScore: 15,
    lastUpdated: new Date()
  },
  {
    id: '4',
    name: 'Moon Token',
    symbol: 'MOON',
    contractAddress: '0x4567890abcdef1234567890abcdef1234567890ab',
    blockchain: 'polygon',
    riskScore: 30,
    liquidity: 750000,
    marketCap: 3500000,
    holders: 2100,
    age: 8,
    volume24h: 200000,
    price: 0.00004567,
    priceChange24h: 12.3,
    isHoneypot: false,
    liquidityLocked: true,
    ownershipRenounced: true,
    hasProxy: false,
    socialScore: 80,
    lastUpdated: new Date()
  }
]

export function LiveScanner() {
  const [tokens, setTokens] = useState<TokenData[]>(mockTokens)
  const [isLoading, setIsLoading] = useState(false)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState<'risk' | 'volume' | 'age' | 'marketCap'>('risk')

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate new token detection
      if (Math.random() > 0.7) {
        const newToken: TokenData = {
          id: Date.now().toString(),
          name: `Token ${Math.floor(Math.random() * 1000)}`,
          symbol: `TKN${Math.floor(Math.random() * 100)}`,
          contractAddress: `0x${Math.random().toString(16).substring(2, 42)}`,
          blockchain: ['ethereum', 'bsc', 'polygon'][Math.floor(Math.random() * 3)] as any,
          riskScore: Math.floor(Math.random() * 100),
          liquidity: Math.floor(Math.random() * 1000000),
          marketCap: Math.floor(Math.random() * 10000000),
          holders: Math.floor(Math.random() * 5000),
          age: Math.floor(Math.random() * 30),
          volume24h: Math.floor(Math.random() * 500000),
          price: Math.random() * 0.001,
          priceChange24h: (Math.random() - 0.5) * 100,
          isHoneypot: Math.random() > 0.7,
          liquidityLocked: Math.random() > 0.5,
          ownershipRenounced: Math.random() > 0.6,
          hasProxy: Math.random() > 0.6,
          socialScore: Math.floor(Math.random() * 100),
          lastUpdated: new Date()
        }
        setTokens(prev => [newToken, ...prev.slice(0, 19)]) // Keep max 20 tokens
      }
    }, 5000) // Update every 5 seconds

    return () => clearInterval(interval)
  }, [])

  const handleRefresh = () => {
    setIsLoading(true)
    setTimeout(() => setIsLoading(false), 1000)
  }

  const sortedTokens = [...tokens].sort((a, b) => {
    switch (sortBy) {
      case 'risk':
        return b.riskScore - a.riskScore
      case 'volume':
        return b.volume24h - a.volume24h
      case 'age':
        return a.age - b.age
      case 'marketCap':
        return b.marketCap - a.marketCap
      default:
        return 0
    }
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <Radar className="w-6 h-6 text-neon-blue" />
            <h2 className="text-2xl font-bold">Live Scanner</h2>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse"></div>
            <span className="text-sm text-dark-300">Real-time monitoring</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          {/* Sort Options */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-3 py-2 bg-dark-800/50 border border-dark-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-neon-blue text-white"
          >
            <option value="risk">Sort by Risk</option>
            <option value="volume">Sort by Volume</option>
            <option value="age">Sort by Age</option>
            <option value="marketCap">Sort by Market Cap</option>
          </select>

          {/* View Mode Toggle */}
          <div className="flex bg-dark-800/50 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded ${viewMode === 'grid' ? 'bg-neon-blue/20 text-neon-blue' : 'text-dark-300'}`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded ${viewMode === 'list' ? 'bg-neon-blue/20 text-neon-blue' : 'text-dark-300'}`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          {/* Refresh Button */}
          <button
            onClick={handleRefresh}
            disabled={isLoading}
            className="p-2 rounded-lg bg-neon-blue/20 text-neon-blue hover:bg-neon-blue/30 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass-effect rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-dark-300">Total Tokens</p>
              <p className="text-2xl font-bold text-white">{tokens.length}</p>
            </div>
            <Radar className="w-8 h-8 text-neon-blue" />
          </div>
        </div>
        
        <div className="glass-effect rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-dark-300">High Risk</p>
              <p className="text-2xl font-bold text-neon-red">
                {tokens.filter(t => t.riskScore > 60).length}
              </p>
            </div>
            <AlertTriangle className="w-8 h-8 text-neon-red" />
          </div>
        </div>
        
        <div className="glass-effect rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-dark-300">Total Volume</p>
              <p className="text-2xl font-bold text-white">
                ${(tokens.reduce((sum, t) => sum + t.volume24h, 0) / 1000000).toFixed(1)}M
              </p>
            </div>
            <TrendingUp className="w-8 h-8 text-neon-green" />
          </div>
        </div>
        
        <div className="glass-effect rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-dark-300">Avg Risk</p>
              <p className="text-2xl font-bold text-white">
                {Math.round(tokens.reduce((sum, t) => sum + t.riskScore, 0) / tokens.length)}
              </p>
            </div>
            <Zap className="w-8 h-8 text-neon-yellow" />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <QuickActions />

      {/* Token Grid */}
      <div className={`grid gap-4 ${
        viewMode === 'grid' 
          ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
          : 'grid-cols-1'
      }`}>
        <AnimatePresence>
          {sortedTokens.map((token) => (
            <motion.div
              key={token.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <TokenCard token={token} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Empty State */}
      {tokens.length === 0 && (
        <div className="text-center py-12">
          <Radar className="w-16 h-16 text-dark-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-dark-300 mb-2">No tokens detected</h3>
          <p className="text-dark-400">New tokens will appear here as they are detected</p>
        </div>
      )}
    </div>
  )
} 