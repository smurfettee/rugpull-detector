'use client'

import { motion } from 'framer-motion'
import { 
  Radar, 
  Shield, 
  Bookmark, 
  History,
  Zap,
  AlertTriangle,
  Star,
  Clock
} from 'lucide-react'
import { TabType } from '@/app/page'

interface TabNavigationProps {
  activeTab: TabType
  onTabChange: (tab: TabType) => void
}

const tabs = [
  {
    id: 'scanner' as TabType,
    label: 'Live Scanner',
    icon: Radar,
    description: 'Real-time token detection',
    color: 'neon-blue'
  },
  {
    id: 'analysis' as TabType,
    label: 'Risk Analysis',
    icon: Shield,
    description: 'Detailed token analysis',
    color: 'neon-purple'
  },
  {
    id: 'watchlist' as TabType,
    label: 'Watchlist',
    icon: Bookmark,
    description: 'Saved tokens',
    color: 'neon-green'
  },
  {
    id: 'recent' as TabType,
    label: 'Recent Scans',
    icon: History,
    description: 'Analysis history',
    color: 'neon-cyan'
  }
]

export function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  return (
    <div className="glass-effect rounded-xl p-1">
      <div className="flex space-x-1">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id
          const Icon = tab.icon
          
          return (
            <motion.button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex-1 flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-all duration-300 relative ${
                isActive
                  ? `bg-${tab.color}/20 text-${tab.color} border border-${tab.color}/30`
                  : 'text-dark-300 hover:text-white hover:bg-white/5'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Icon className={`w-5 h-5 ${isActive ? `text-${tab.color}` : 'text-dark-400'}`} />
              <div className="text-left">
                <div className="font-semibold">{tab.label}</div>
                <div className="text-xs opacity-70">{tab.description}</div>
              </div>
              
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className={`absolute inset-0 bg-${tab.color}/10 border border-${tab.color}/30 rounded-lg`}
                  initial={false}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </motion.button>
          )
        })}
      </div>
    </div>
  )
} 