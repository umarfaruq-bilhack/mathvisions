'use client'
import { useAccount, useReadContract, useWriteContract,
         useWaitForTransactionReceipt }           from 'wagmi'
import { formatEther }                            from 'viem'
import { useState }                               from 'react'
import { ABI, CONTRACT_ADDRESS }                  from '@/lib/contract'

export function usePatron() {
  const { address, isConnected } = useAccount()
  const [txHash, setTxHash]      = useState<`0x${string}` | undefined>()

  const { data: info, refetch } = useReadContract({
    address:      CONTRACT_ADDRESS as `0x${string}`,
    abi:          ABI,
    functionName: 'patronInfo',
    args:         address ? [address] : undefined,
    query:        { enabled: !!address },
  })

  const { writeContractAsync, isPending } = useWriteContract()

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({ hash: txHash })

  const mints        = info ? Number(info[0])                           : 0
  const isPatron     = info ? info[1]                                   : false
  const pending      = info ? info[2]                                   : BigInt(0)
  const sharePercent = info ? Number(info[3]) / 100                     : 0 // bps → %
  const pendingEth   = formatEther(pending)

  async function claim() {
    if (!isConnected || !isPatron) return
    const hash = await writeContractAsync({
      address:      CONTRACT_ADDRESS as `0x${string}`,
      abi:          ABI,
      functionName: 'claimDividend',
    })
    setTxHash(hash)
    return hash
  }

  return {
    mints, isPatron, pending, pendingEth, sharePercent,
    isPending, isConfirming, isConfirmed,
    claim, refetch,
    isConnected, address,
  }
}
