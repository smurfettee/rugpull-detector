'use client'

import { motion } from 'framer-motion'

interface RiskMeterProps {
  score: number
  size?: number
}

export function RiskMeter({ score, size = 40 }: RiskMeterProps) {
  const radius = (size - 4) / 2
  const circumference = 2 * Math.PI * radius
  const strokeDasharray = circumference
  const strokeDashoffset = circumference - (score / 100) * circumference

  const getRiskColor = (score: number) => {
    if (score <= 30) return '#00ff88' // neon-green
    if (score <= 60) return '#ffd700' // neon-yellow
    if (score <= 80) return '#ff8c00' // neon-orange
    return '#ff0066' // neon-red
  }

  const getRiskGlow = (score: number) => {
    if (score <= 30) return 'neon-glow-green'
    if (score <= 60) return 'shadow-[0_0_20px_rgba(255,215,0,0.5)]'
    if (score <= 80) return 'shadow-[0_0_20px_rgba(255,140,0,0.5)]'
    return 'neon-glow-red'
  }

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#334155"
          strokeWidth="3"
          fill="none"
        />
        
        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={getRiskColor(score)}
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={strokeDasharray}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={getRiskGlow(score)}
        />
      </svg>
      
      {/* Center text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, duration: 0.3 }}
          className="text-xs font-bold text-white"
        >
          {score}
        </motion.div>
      </div>
    </div>
  )
} 