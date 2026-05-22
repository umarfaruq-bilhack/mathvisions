'use client'
import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { mainnet, sepolia } from 'wagmi/chains'

export const wagmiConfig = getDefaultConfig({
  appName:     'Mathematical Visions',
  projectId:   'mathvisions', // get a real one from cloud.walletconnect.com
  chains:      [sepolia, mainnet],
  ssr:         true,
})
