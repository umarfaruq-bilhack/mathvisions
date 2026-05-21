'use client'
import { useState }                               from 'react'
import { useAccount, useWriteContract,
         useWaitForTransactionReceipt,
         useReadContract }                        from 'wagmi'
import { parseEther, formatEther }                from 'viem'
import { ABI, CONTRACT_ADDRESS }                  from '@/lib/contract'
import { COLLECTION }                             from '@/lib/constants'

export function useMint() {
  const { address, isConnected } = useAccount()
  const [quantity, setQuantity]  = useState(1)
  const [txHash, setTxHash]      = useState<`0x${string}` | undefined>()

  // Read live mint price from contract
  const { data: mintPrice } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi:     ABI,
    functionName: 'MINT_PRICE',
  })

  // Read collection stats
  const { data: stats, refetch: refetchStats } = useReadContract({
    address:      CONTRACT_ADDRESS as `0x${string}`,
    abi:          ABI,
    functionName: 'collectionStats',
  })

  // Write: mint
  const { writeContractAsync, isPending: isWritePending } = useWriteContract()

  // Wait for tx confirmation
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({ hash: txHash })

  const price        = mintPrice ?? BigInt(COLLECTION.mintPrice * 1e18 / 2500) // fallback
  const totalCost    = price * BigInt(quantity)
  const patronPool   = totalCost * BigInt(10) / BigInt(100)
  const isPatronQty  = quantity >= COLLECTION.patronThreshold

  const minted    = stats ? Number(stats[0]) : 0
  const remaining = stats ? Number(stats[1]) : COLLECTION.totalSupply
  const active    = stats ? stats[5]         : false

  async function mint() {
    if (!isConnected || !address) return
    try {
      const hash = await writeContractAsync({
        address:      CONTRACT_ADDRESS as `0x${string}`,
        abi:          ABI,
        functionName: 'mint',
        args:         [BigInt(quantity)],
        value:        totalCost,
      })
      setTxHash(hash)
      return hash
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err)
      if (msg.includes('User rejected')) throw new Error('Transaction rejected')
      if (msg.includes('insufficient'))  throw new Error('Insufficient ETH balance')
      throw new Error('Mint failed — check your wallet and try again')
    }
  }

  return {
    // State
    quantity, setQuantity,
    txHash, isWritePending, isConfirming, isConfirmed,
    // Contract data
    price, totalCost, patronPool, isPatronQty,
    minted, remaining, active,
    // Actions
    mint,
    refetchStats,
    // Wallet
    isConnected, address,
  }
}
