'use client'

import { motion } from 'framer-motion'
import { 
  Copy, 
  ExternalLink, 
  Bookmark, 
  AlertTriangle,
  Shield,
  DollarSign,
  Users,
  Clock,
  TrendingUp,
  TrendingDown,
  Zap,
  Lock,
  Unlock,
  Eye,
  EyeOff
} from 'lucide-react'
import { TokenData } from '@/types/token'
import { RiskMeter } from './RiskMeter'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { AnimatePresence } from 'framer-motion'

interface TokenCardProps {
  token: TokenData
}

export function TokenCard({ token }: TokenCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isWatched, setIsWatched] = useState(false)

  const getRiskColor = (score: number) => {
    if (score <= 30) return 'text-neon-green'
    if (score <= 60) return 'text-neon-yellow'
    if (score <= 80) return 'text-neon-orange'
    return 'text-neon-red'
  }

  const getRiskLevel = (score: number) => {
    if (score <= 30) return 'Low'
    if (score <= 60) return 'Medium'
    if (score <= 80) return 'High'
    return 'Extreme'
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success('Copied to clipboard')
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toLocaleString()
  }

  const formatPrice = (price: number) => {
    if (price < 0.000001) return price.toExponential(2)
    return price.toFixed(8)
  }

  return (
    <motion.div
      className="glass-effect rounded-xl p-4 card-hover"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-1">
            <h3 className="font-bold text-white truncate">{token.name}</h3>
            <span className="text-xs px-2 py-1 bg-dark-600 rounded-full text-dark-300">
              {token.symbol}
            </span>
          </div>
          <div className="flex items-center space-x-2 text-xs text-dark-400">
            <span className="capitalize">{token.blockchain}</span>
            <span>•</span>
            <span>{token.age} days old</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-1">
          <button
            onClick={() => setIsWatched(!isWatched)}
            className={`p-1 rounded transition-colors ${
              isWatched 
                ? 'text-neon-green hover:text-neon-green/80' 
                : 'text-dark-400 hover:text-white'
            }`}
          >
            <Bookmark className="w-4 h-4" fill={isWatched ? 'currentColor' : 'none'} />
          </button>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 rounded text-dark-400 hover:text-white transition-colors"
          >
            {isExpanded ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Risk Meter */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <RiskMeter score={token.riskScore} />
          <div>
            <div className={`font-bold ${getRiskColor(token.riskScore)}`}>
              {token.riskScore}/100
            </div>
            <div className="text-xs text-dark-400">{getRiskLevel(token.riskScore)} Risk</div>
          </div>
        </div>
        
        {token.riskScore > 60 && (
          <AlertTriangle className="w-5 h-5 text-neon-red" />
        )}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-1 text-xs text-dark-400 mb-1">
            <DollarSign className="w-3 h-3" />
            <span>Liquidity</span>
          </div>
          <div className="text-sm font-semibold text-white">
            ${formatNumber(token.liquidity)}
          </div>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center space-x-1 text-xs text-dark-400 mb-1">
            <Users className="w-3 h-3" />
            <span>Holders</span>
          </div>
          <div className="text-sm font-semibold text-white">
            {formatNumber(token.holders)}
          </div>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center space-x-1 text-xs text-dark-400 mb-1">
            <TrendingUp className="w-3 h-3" />
            <span>Volume 24h</span>
          </div>
          <div className="text-sm font-semibold text-white">
            ${formatNumber(token.volume24h)}
          </div>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center space-x-1 text-xs text-dark-400 mb-1">
            <Zap className="w-3 h-3" />
            <span>Price</span>
          </div>
          <div className="text-sm font-semibold text-white">
            ${formatPrice(token.price)}
          </div>
        </div>
      </div>

      {/* Price Change */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs text-dark-400">24h Change</span>
        <div className={`flex items-center space-x-1 text-sm font-semibold ${
          token.priceChange24h >= 0 ? 'text-neon-green' : 'text-neon-red'
        }`}>
          {token.priceChange24h >= 0 ? (
            <TrendingUp className="w-3 h-3" />
          ) : (
            <TrendingDown className="w-3 h-3" />
          )}
          <span>{Math.abs(token.priceChange24h).toFixed(1)}%</span>
        </div>
      </div>

      {/* Contract Address */}
      <div className="flex items-center space-x-2 mb-4">
        <div className="flex-1 bg-dark-800/50 rounded-lg px-3 py-2">
          <div className="text-xs text-dark-400 mb-1">Contract</div>
          <div className="text-xs text-white font-mono truncate">
            {token.contractAddress}
          </div>
        </div>
        <button
          onClick={() => copyToClipboard(token.contractAddress)}
          className="p-2 rounded-lg bg-dark-600/50 hover:bg-dark-600 transition-colors"
        >
          <Copy className="w-3 h-3 text-dark-300" />
        </button>
      </div>

      {/* Risk Indicators */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        <div className={`flex items-center space-x-2 text-xs ${
          token.isHoneypot ? 'text-neon-red' : 'text-neon-green'
        }`}>
          {token.isHoneypot ? (
            <AlertTriangle className="w-3 h-3" />
          ) : (
            <Shield className="w-3 h-3" />
          )}
          <span>{token.isHoneypot ? 'Honeypot' : 'Safe'}</span>
        </div>
        
        <div className={`flex items-center space-x-2 text-xs ${
          token.liquidityLocked ? 'text-neon-green' : 'text-neon-red'
        }`}>
          {token.liquidityLocked ? (
            <Lock className="w-3 h-3" />
          ) : (
            <Unlock className="w-3 h-3" />
          )}
          <span>{token.liquidityLocked ? 'Locked' : 'Unlocked'}</span>
        </div>
        
        <div className={`flex items-center space-x-2 text-xs ${
          token.ownershipRenounced ? 'text-neon-green' : 'text-neon-red'
        }`}>
          {token.ownershipRenounced ? (
            <Shield className="w-3 h-3" />
          ) : (
            <AlertTriangle className="w-3 h-3" />
          )}
          <span>{token.ownershipRenounced ? 'Renounced' : 'Owned'}</span>
        </div>
        
        <div className={`flex items-center space-x-2 text-xs ${
          token.hasProxy ? 'text-neon-red' : 'text-neon-green'
        }`}>
          {token.hasProxy ? (
            <AlertTriangle className="w-3 h-3" />
          ) : (
            <Shield className="w-3 h-3" />
          )}
          <span>{token.hasProxy ? 'Proxy' : 'Direct'}</span>
        </div>
      </div>

      {/* Expanded Details */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-white/10 pt-4 mt-4"
          >
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <div className="text-dark-400 mb-1">Market Cap</div>
                  <div className="text-white font-semibold">
                    ${formatNumber(token.marketCap)}
                  </div>
                </div>
                <div>
                  <div className="text-dark-400 mb-1">Social Score</div>
                  <div className="text-white font-semibold">
                    {token.socialScore}/100
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <button className="flex-1 px-3 py-2 bg-neon-blue/20 text-neon-blue border border-neon-blue/30 rounded-lg hover:bg-neon-blue/30 transition-colors text-xs">
                  Analyze
                </button>
                <button className="flex-1 px-3 py-2 bg-dark-600/50 text-dark-300 border border-dark-600 rounded-lg hover:bg-dark-600 transition-colors text-xs">
                  View Chart
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
} 