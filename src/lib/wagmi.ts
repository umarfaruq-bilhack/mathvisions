'use client'
import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { mainnet, sepolia } from 'wagmi/chains'

export const wagmiConfig = getDefaultConfig({
  appName:     'Mathematical Visions',
  projectId:   '0d1a331b75a92c9b975699b93a1f891b', // get a real one from cloud.walletconnect.com
  chains:      [sepolia, mainnet],
  ssr:         true,
})
