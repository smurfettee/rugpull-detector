'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TokenCard } from '@/components/tokens/TokenCard'
import { 
  Bookmark, 
  Trash2, 
  Bell, 
  Settings,
  Plus,
  Search,
  Filter,
  SortAsc,
  SortDesc
} from 'lucide-react'
import { TokenData } from '@/types/token'

// Mock watchlist data
const mockWatchlist: TokenData[] = [
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
  }
]

export function Watchlist() {
  const [watchlist, setWatchlist] = useState<TokenData[]>(mockWatchlist)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<'name' | 'risk' | 'price' | 'volume'>('risk')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const filteredTokens = watchlist.filter(token =>
    token.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    token.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const sortedTokens = [...filteredTokens].sort((a, b) => {
    let comparison = 0
    switch (sortBy) {
      case 'name':
        comparison = a.name.localeCompare(b.name)
        break
      case 'risk':
        comparison = a.riskScore - b.riskScore
        break
      case 'price':
        comparison = a.price - b.price
        break
      case 'volume':
        comparison = a.volume24h - b.volume24h
        break
    }
    return sortOrder === 'asc' ? comparison : -comparison
  })

  const removeFromWatchlist = (tokenId: string) => {
    setWatchlist(prev => prev.filter(token => token.id !== tokenId))
  }

  const toggleSortOrder = () => {
    setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Bookmark className="w-6 h-6 text-neon-green" />
          <h2 className="text-2xl font-bold">Watchlist</h2>
          <span className="text-sm text-dark-300">({watchlist.length} tokens)</span>
        </div>
        
        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 bg-neon-green/20 text-neon-green border border-neon-green/30 rounded-lg hover:bg-neon-green/30 transition-colors flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>Add Token</span>
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="glass-effect rounded-xl p-4">
        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-dark-400" />
            <input
              type="text"
              placeholder="Search watchlist..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-dark-800/50 border border-dark-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-neon-green focus:border-transparent text-white placeholder-dark-400"
            />
          </div>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-3 py-2 bg-dark-800/50 border border-dark-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-neon-green text-white"
          >
            <option value="risk">Sort by Risk</option>
            <option value="name">Sort by Name</option>
            <option value="price">Sort by Price</option>
            <option value="volume">Sort by Volume</option>
          </select>
          
          <button
            onClick={toggleSortOrder}
            className="p-2 rounded-lg bg-dark-600/50 hover:bg-dark-600 transition-colors"
          >
            {sortOrder === 'asc' ? (
              <SortAsc className="w-4 h-4 text-dark-300" />
            ) : (
              <SortDesc className="w-4 h-4 text-dark-300" />
            )}
          </button>
          
          <div className="flex bg-dark-800/50 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded ${viewMode === 'grid' ? 'bg-neon-green/20 text-neon-green' : 'text-dark-300'}`}
            >
              <div className="w-4 h-4 grid grid-cols-2 gap-0.5">
                <div className="bg-current rounded-sm"></div>
                <div className="bg-current rounded-sm"></div>
                <div className="bg-current rounded-sm"></div>
                <div className="bg-current rounded-sm"></div>
              </div>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded ${viewMode === 'list' ? 'bg-neon-green/20 text-neon-green' : 'text-dark-300'}`}
            >
              <div className="w-4 h-4 space-y-1">
                <div className="bg-current rounded-sm h-0.5"></div>
                <div className="bg-current rounded-sm h-0.5"></div>
                <div className="bg-current rounded-sm h-0.5"></div>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass-effect rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-dark-300">Total Tokens</p>
              <p className="text-2xl font-bold text-white">{watchlist.length}</p>
            </div>
            <Bookmark className="w-8 h-8 text-neon-green" />
          </div>
        </div>
        
        <div className="glass-effect rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-dark-300">High Risk</p>
              <p className="text-2xl font-bold text-neon-red">
                {watchlist.filter(t => t.riskScore > 60).length}
              </p>
            </div>
            <div className="w-8 h-8 bg-neon-red/20 rounded-lg flex items-center justify-center">
              <div className="w-3 h-3 bg-neon-red rounded-full"></div>
            </div>
          </div>
        </div>
        
        <div className="glass-effect rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-dark-300">Avg Risk</p>
              <p className="text-2xl font-bold text-white">
                {watchlist.length > 0 
                  ? Math.round(watchlist.reduce((sum, t) => sum + t.riskScore, 0) / watchlist.length)
                  : 0
                }
              </p>
            </div>
            <div className="w-8 h-8 bg-neon-yellow/20 rounded-lg flex items-center justify-center">
              <div className="w-3 h-3 bg-neon-yellow rounded-full"></div>
            </div>
          </div>
        </div>
        
        <div className="glass-effect rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-dark-300">Alerts</p>
              <p className="text-2xl font-bold text-neon-blue">3</p>
            </div>
            <Bell className="w-8 h-8 text-neon-blue" />
          </div>
        </div>
      </div>

      {/* Token Grid */}
      {sortedTokens.length > 0 ? (
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
                className="relative"
              >
                <TokenCard token={token} />
                <button
                  onClick={() => removeFromWatchlist(token.id)}
                  className="absolute top-2 right-2 p-1 bg-neon-red/20 text-neon-red rounded-lg hover:bg-neon-red/30 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <div className="text-center py-12">
          <Bookmark className="w-16 h-16 text-dark-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-dark-300 mb-2">
            {searchQuery ? 'No tokens found' : 'Watchlist is empty'}
          </h3>
          <p className="text-dark-400">
            {searchQuery 
              ? 'Try adjusting your search terms'
              : 'Add tokens to your watchlist to track them here'
            }
          </p>
        </div>
      )}
    </div>
  )
} 