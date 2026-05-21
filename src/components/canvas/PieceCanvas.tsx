'use client'
import { useEffect, useRef } from 'react'
import { renderPiece, AlgoKey } from '@/lib/engine'

interface Props {
  algoKey: AlgoKey
  seed: number
  size?: number
  className?: string
}

export function PieceCanvas({ algoKey, seed, size = 300, className }: Props) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    renderPiece(ctx, size, algoKey, seed)
  }, [algoKey, seed, size])

  return (
    <canvas
      ref={ref}
      width={size}
      height={size}
      className={className}
      style={{ display: 'block', width: '100%', aspectRatio: '1', imageRendering: 'auto' }}
    />
  )
}
