'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TokenCard } from '@/components/tokens/TokenCard'
import { 
  History, 
  Clock, 
  Search, 
  Filter,
  Download,
  Trash2,
  Eye,
  EyeOff,
  Calendar,
  TrendingUp,
  AlertTriangle
} from 'lucide-react'
import { TokenData } from '@/types/token'

// Mock recent scans data
const mockRecentScans: TokenData[] = [
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
    lastUpdated: new Date(Date.now() - 1000 * 60 * 30) // 30 minutes ago
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
    lastUpdated: new Date(Date.now() - 1000 * 60 * 60 * 2) // 2 hours ago
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
    lastUpdated: new Date(Date.now() - 1000 * 60 * 60 * 5) // 5 hours ago
  }
]

export function RecentScans() {
  const [recentScans, setRecentScans] = useState<TokenData[]>(mockRecentScans)
  const [searchQuery, setSearchQuery] = useState('')
  const [timeFilter, setTimeFilter] = useState<'all' | '1h' | '24h' | '7d'>('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showDetails, setShowDetails] = useState(false)

  const filteredScans = recentScans.filter(scan => {
    const matchesSearch = scan.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         scan.symbol.toLowerCase().includes(searchQuery.toLowerCase())
    
    if (!matchesSearch) return false
    
    if (timeFilter === 'all') return true
    
    const now = Date.now()
    const scanTime = scan.lastUpdated.getTime()
    const timeDiff = now - scanTime
    
    switch (timeFilter) {
      case '1h':
        return timeDiff <= 1000 * 60 * 60
      case '24h':
        return timeDiff <= 1000 * 60 * 60 * 24
      case '7d':
        return timeDiff <= 1000 * 60 * 60 * 24 * 7
      default:
        return true
    }
  })

  const formatTimeAgo = (date: Date) => {
    const now = Date.now()
    const diff = now - date.getTime()
    const minutes = Math.floor(diff / (1000 * 60))
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    
    if (minutes < 60) return `${minutes}m ago`
    if (hours < 24) return `${hours}h ago`
    return `${days}d ago`
  }

  const clearHistory = () => {
    setRecentScans([])
  }

  const exportHistory = () => {
    // Mock export functionality
    console.log('Exporting scan history...')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <History className="w-6 h-6 text-neon-cyan" />
          <h2 className="text-2xl font-bold">Recent Scans</h2>
          <span className="text-sm text-dark-300">({recentScans.length} analyses)</span>
        </div>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="p-2 rounded-lg bg-dark-600/50 hover:bg-dark-600 transition-colors"
          >
            {showDetails ? <EyeOff className="w-4 h-4 text-dark-300" /> : <Eye className="w-4 h-4 text-dark-300" />}
          </button>
          <button
            onClick={exportHistory}
            className="px-4 py-2 bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/30 rounded-lg hover:bg-neon-cyan/30 transition-colors flex items-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
          <button
            onClick={clearHistory}
            className="px-4 py-2 bg-neon-red/20 text-neon-red border border-neon-red/30 rounded-lg hover:bg-neon-red/30 transition-colors flex items-center space-x-2"
          >
            <Trash2 className="w-4 h-4" />
            <span>Clear</span>
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
              placeholder="Search recent scans..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-dark-800/50 border border-dark-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-neon-cyan focus:border-transparent text-white placeholder-dark-400"
            />
          </div>
          
          <select
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value as any)}
            className="px-3 py-2 bg-dark-800/50 border border-dark-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-neon-cyan text-white"
          >
            <option value="all">All Time</option>
            <option value="1h">Last Hour</option>
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
          </select>
          
          <div className="flex bg-dark-800/50 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded ${viewMode === 'grid' ? 'bg-neon-cyan/20 text-neon-cyan' : 'text-dark-300'}`}
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
              className={`p-2 rounded ${viewMode === 'list' ? 'bg-neon-cyan/20 text-neon-cyan' : 'text-dark-300'}`}
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
              <p className="text-sm text-dark-300">Total Scans</p>
              <p className="text-2xl font-bold text-white">{recentScans.length}</p>
            </div>
            <History className="w-8 h-8 text-neon-cyan" />
          </div>
        </div>
        
        <div className="glass-effect rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-dark-300">High Risk Found</p>
              <p className="text-2xl font-bold text-neon-red">
                {recentScans.filter(t => t.riskScore > 60).length}
              </p>
            </div>
            <AlertTriangle className="w-8 h-8 text-neon-red" />
          </div>
        </div>
        
        <div className="glass-effect rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-dark-300">Avg Risk</p>
              <p className="text-2xl font-bold text-white">
                {recentScans.length > 0 
                  ? Math.round(recentScans.reduce((sum, t) => sum + t.riskScore, 0) / recentScans.length)
                  : 0
                }
              </p>
            </div>
            <TrendingUp className="w-8 h-8 text-neon-yellow" />
          </div>
        </div>
        
        <div className="glass-effect rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-dark-300">Last Scan</p>
              <p className="text-2xl font-bold text-white">
                {recentScans.length > 0 ? formatTimeAgo(recentScans[0].lastUpdated) : 'Never'}
              </p>
            </div>
            <Clock className="w-8 h-8 text-neon-blue" />
          </div>
        </div>
      </div>

      {/* Scan History */}
      {filteredScans.length > 0 ? (
        <div className={`grid gap-4 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
            : 'grid-cols-1'
        }`}>
          <AnimatePresence>
            {filteredScans.map((scan) => (
              <motion.div
                key={scan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                <TokenCard token={scan} />
                {showDetails && (
                  <div className="absolute top-2 left-2 bg-dark-800/90 backdrop-blur-sm rounded-lg px-2 py-1">
                    <div className="text-xs text-dark-300">
                      {formatTimeAgo(scan.lastUpdated)}
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <div className="text-center py-12">
          <History className="w-16 h-16 text-dark-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-dark-300 mb-2">
            {searchQuery ? 'No scans found' : 'No recent scans'}
          </h3>
          <p className="text-dark-400">
            {searchQuery 
              ? 'Try adjusting your search terms or time filter'
              : 'Scan some tokens to see your analysis history here'
            }
          </p>
        </div>
      )}
    </div>
  )
} 