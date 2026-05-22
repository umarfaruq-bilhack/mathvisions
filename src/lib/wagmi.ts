'use client'
import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { mainnet, sepolia } from 'wagmi/chains'
import { http } from 'wagmi'

export const wagmiConfig = getDefaultConfig({
  appName:    'Mathematical Visions',
  projectId:  'mathvisions',
  chains:     [mainnet, sepolia],
  transports: {
    [mainnet.id]: http('https://eth-mainnet.g.alchemy.com/v2/tKaj84zp4O5dqb6O8RAjr'),
    [sepolia.id]: http('https://eth-sepolia.g.alchemy.com/v2/tKaj84zp4O5dqb6O8RAjr'),
  },
  ssr: true,
})
