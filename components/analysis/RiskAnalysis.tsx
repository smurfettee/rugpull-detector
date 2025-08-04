'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Shield, 
  AlertTriangle, 
  Search, 
  Code, 
  Lock, 
  Users, 
  TrendingUp,
  Twitter,
  MessageCircle,
  CheckCircle,
  XCircle,
  Info
} from 'lucide-react'
import { TokenData } from '@/types/token'

export function RiskAnalysis() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedToken, setSelectedToken] = useState<TokenData | null>(null)

  // Mock token for analysis
  const mockToken: TokenData = {
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
  }

  const analysisSections = [
    {
      title: 'Contract Analysis',
      icon: Code,
      color: 'neon-blue',
      items: [
        { label: 'Proxy Contract', value: 'Yes', status: 'danger' },
        { label: 'Source Code', value: 'Not Verified', status: 'warning' },
        { label: 'Honeypot Detection', value: 'Detected', status: 'danger' },
        { label: 'Ownership Renounced', value: 'No', status: 'danger' },
        { label: 'Mint Function', value: 'Present', status: 'danger' },
        { label: 'Hidden Fees', value: 'Detected', status: 'danger' }
      ]
    },
    {
      title: 'Liquidity Analysis',
      icon: Lock,
      color: 'neon-green',
      items: [
        { label: 'Liquidity Locked', value: 'No', status: 'danger' },
        { label: 'Lock Percentage', value: '0%', status: 'danger' },
        { label: 'Lock Duration', value: '0 days', status: 'danger' },
        { label: 'LP Providers', value: '2', status: 'warning' },
        { label: 'Liquidity Changes', value: 'Frequent', status: 'danger' }
      ]
    },
    {
      title: 'Trading Analysis',
      icon: TrendingUp,
      color: 'neon-purple',
      items: [
        { label: 'Buy/Sell Ratio', value: '0.3', status: 'danger' },
        { label: 'Large Transactions', value: '15', status: 'warning' },
        { label: 'Price Manipulation', value: 'Detected', status: 'danger' },
        { label: 'Volume Spikes', value: 'Multiple', status: 'warning' },
        { label: 'Whale Activity', value: 'High', status: 'danger' }
      ]
    },
    {
      title: 'Social Analysis',
      icon: Twitter,
      color: 'neon-cyan',
      items: [
        { label: 'Twitter Followers', value: '150', status: 'warning' },
        { label: 'Telegram Members', value: '2.5K', status: 'warning' },
        { label: 'Social Sentiment', value: '25%', status: 'danger' },
        { label: 'Bot Activity', value: 'High', status: 'danger' },
        { label: 'Team Verified', value: 'No', status: 'danger' }
      ]
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'text-neon-green'
      case 'warning': return 'text-neon-yellow'
      case 'danger': return 'text-neon-red'
      default: return 'text-dark-300'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return <CheckCircle className="w-4 h-4" />
      case 'warning': return <AlertTriangle className="w-4 h-4" />
      case 'danger': return <XCircle className="w-4 h-4" />
      default: return <Info className="w-4 h-4" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Shield className="w-6 h-6 text-neon-purple" />
          <h2 className="text-2xl font-bold">Risk Analysis</h2>
        </div>
      </div>

      {/* Search */}
      <div className="glass-effect rounded-xl p-4">
        <div className="flex items-center space-x-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-dark-400" />
            <input
              type="text"
              placeholder="Enter contract address or token symbol..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-dark-800/50 border border-dark-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-neon-purple focus:border-transparent text-white placeholder-dark-400"
            />
          </div>
          <button className="px-6 py-3 bg-neon-purple/20 text-neon-purple border border-neon-purple/30 rounded-lg hover:bg-neon-purple/30 transition-colors">
            Analyze
          </button>
        </div>
      </div>

      {/* Token Overview */}
      {selectedToken && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-effect rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-xl font-bold text-white">{selectedToken.name}</h3>
              <p className="text-dark-300">{selectedToken.symbol} • {selectedToken.blockchain}</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-neon-red">{selectedToken.riskScore}/100</div>
              <div className="text-sm text-dark-300">Risk Score</div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-sm text-dark-300">Liquidity</div>
              <div className="text-white font-semibold">${(selectedToken.liquidity / 1000).toFixed(0)}K</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-dark-300">Holders</div>
              <div className="text-white font-semibold">{selectedToken.holders.toLocaleString()}</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-dark-300">Age</div>
              <div className="text-white font-semibold">{selectedToken.age} days</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-dark-300">Social Score</div>
              <div className="text-white font-semibold">{selectedToken.socialScore}/100</div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Analysis Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {analysisSections.map((section, index) => {
          const Icon = section.icon
          return (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-effect rounded-xl p-6"
            >
              <div className="flex items-center space-x-3 mb-4">
                <Icon className={`w-6 h-6 text-${section.color}`} />
                <h3 className="text-lg font-semibold text-white">{section.title}</h3>
              </div>
              
              <div className="space-y-3">
                {section.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex items-center justify-between py-2 border-b border-white/5 last:border-b-0">
                    <span className="text-sm text-dark-300">{item.label}</span>
                    <div className="flex items-center space-x-2">
                      <span className={`text-sm font-medium ${getStatusColor(item.status)}`}>
                        {item.value}
                      </span>
                      <div className={getStatusColor(item.status)}>
                        {getStatusIcon(item.status)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Recommendations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-effect rounded-xl p-6"
      >
        <div className="flex items-center space-x-3 mb-4">
          <AlertTriangle className="w-6 h-6 text-neon-red" />
          <h3 className="text-lg font-semibold text-white">Risk Assessment</h3>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-start space-x-3 p-3 bg-neon-red/10 border border-neon-red/20 rounded-lg">
            <XCircle className="w-5 h-5 text-neon-red mt-0.5" />
            <div>
              <div className="font-semibold text-neon-red">High Risk Token</div>
              <div className="text-sm text-dark-300">
                This token shows multiple red flags including honeypot detection, unlocked liquidity, and suspicious trading patterns.
              </div>
            </div>
          </div>
          
          <div className="flex items-start space-x-3 p-3 bg-neon-yellow/10 border border-neon-yellow/20 rounded-lg">
            <AlertTriangle className="w-5 h-5 text-neon-yellow mt-0.5" />
            <div>
              <div className="font-semibold text-neon-yellow">Recommendation</div>
              <div className="text-sm text-dark-300">
                Avoid investing in this token. Consider reporting it to the community for further investigation.
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
} 