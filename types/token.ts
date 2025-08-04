export type Blockchain = 'ethereum' | 'bsc' | 'polygon' | 'arbitrum' | 'optimism'

export interface TokenData {
  id: string
  name: string
  symbol: string
  contractAddress: string
  blockchain: Blockchain
  riskScore: number
  liquidity: number
  marketCap: number
  holders: number
  age: number // in days
  volume24h: number
  price: number
  priceChange24h: number
  isHoneypot: boolean
  liquidityLocked: boolean
  ownershipRenounced: boolean
  hasProxy: boolean
  socialScore: number
  lastUpdated: Date
}

export interface RiskAnalysis {
  contractAnalysis: {
    isProxy: boolean
    hasSourceCode: boolean
    isHoneypot: boolean
    ownershipRenounced: boolean
    hasMintFunction: boolean
    hasBurnFunction: boolean
    hasHiddenFees: boolean
    maxTransactionLimit: number
    maxWalletLimit: number
  }
  liquidityAnalysis: {
    isLocked: boolean
    lockPercentage: number
    lockDuration: number
    liquidityProviderCount: number
    liquidityChanges: Array<{
      timestamp: Date
      amount: number
    }>
  }
  tradingAnalysis: {
    buySellRatio: number
    largeTransactions: number
    priceManipulation: boolean
    volumeSpikes: Array<{
      timestamp: Date
      volume: number
    }>
  }
  socialAnalysis: {
    twitterFollowers: number
    telegramMembers: number
    socialSentiment: number
    botActivity: number
    teamVerified: boolean
  }
}

export type RiskLevel = 'low' | 'medium' | 'high' | 'extreme'

export interface Alert {
  id: string
  type: 'risk' | 'volume' | 'price' | 'social'
  tokenId: string
  message: string
  severity: 'info' | 'warning' | 'error'
  timestamp: Date
  isRead: boolean
} 