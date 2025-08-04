'use client'

import { motion } from 'framer-motion'
import { 
  Download, 
  Share2, 
  Filter, 
  Settings,
  AlertTriangle,
  Bookmark,
  RefreshCw,
  Zap
} from 'lucide-react'

export function QuickActions() {
  const actions = [
    {
      icon: Download,
      label: 'Export',
      color: 'neon-blue',
      onClick: () => console.log('Export clicked')
    },
    {
      icon: Share2,
      label: 'Share',
      color: 'neon-green',
      onClick: () => console.log('Share clicked')
    },
    {
      icon: Filter,
      label: 'Filters',
      color: 'neon-purple',
      onClick: () => console.log('Filters clicked')
    },
    {
      icon: AlertTriangle,
      label: 'Alerts',
      color: 'neon-red',
      onClick: () => console.log('Alerts clicked')
    },
    {
      icon: Bookmark,
      label: 'Watchlist',
      color: 'neon-cyan',
      onClick: () => console.log('Watchlist clicked')
    },
    {
      icon: RefreshCw,
      label: 'Refresh',
      color: 'neon-yellow',
      onClick: () => console.log('Refresh clicked')
    }
  ]

  return (
    <div className="glass-effect rounded-xl p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Quick Actions</h3>
        <div className="flex items-center space-x-2">
          <Zap className="w-4 h-4 text-neon-blue" />
          <span className="text-sm text-dark-300">Bulk operations</span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {actions.map((action, index) => {
          const Icon = action.icon
          return (
            <motion.button
              key={action.label}
              onClick={action.onClick}
              className={`flex flex-col items-center space-y-2 p-3 rounded-lg bg-dark-800/50 border border-dark-600 hover:border-${action.color}/30 transition-all duration-300 group`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Icon className={`w-5 h-5 text-${action.color} group-hover:text-${action.color}/80`} />
              <span className="text-xs text-dark-300 group-hover:text-white transition-colors">
                {action.label}
              </span>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
} 