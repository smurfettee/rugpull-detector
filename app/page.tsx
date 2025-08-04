'use client'

import { useState } from 'react'
import { DashboardHeader } from '@/components/layout/DashboardHeader'
import { TabNavigation } from '@/components/layout/TabNavigation'
import { LiveScanner } from '@/components/scanner/LiveScanner'
import { RiskAnalysis } from '@/components/analysis/RiskAnalysis'
import { Watchlist } from '@/components/watchlist/Watchlist'
import { RecentScans } from '@/components/scanner/RecentScans'
import { FilterSidebar } from '@/components/layout/FilterSidebar'

export type TabType = 'scanner' | 'analysis' | 'watchlist' | 'recent'

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<TabType>('scanner')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const renderTabContent = () => {
    switch (activeTab) {
      case 'scanner':
        return <LiveScanner />
      case 'analysis':
        return <RiskAnalysis />
      case 'watchlist':
        return <Watchlist />
      case 'recent':
        return <RecentScans />
      default:
        return <LiveScanner />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-dark">
      <DashboardHeader onMenuClick={() => setSidebarOpen(true)} />
      
      <div className="flex">
        <FilterSidebar 
          isOpen={sidebarOpen} 
          onClose={() => setSidebarOpen(false)} 
        />
        
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-4xl font-bold gradient-text mb-2">
                RugPull Detector
              </h1>
              <p className="text-dark-300 text-lg">
                Professional token analysis and risk detection
              </p>
            </div>
            
            <TabNavigation 
              activeTab={activeTab} 
              onTabChange={setActiveTab} 
            />
            
            <div className="mt-6 animate-fade-in">
              {renderTabContent()}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
} 