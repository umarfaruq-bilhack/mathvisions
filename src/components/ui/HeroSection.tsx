'use client'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { renderPiece } from '@/lib/engine'
import { MOCK_STATE, COLLECTION } from '@/lib/constants'
import styles from './HeroSection.module.css'

function useCountUp(target: number, duration = 1200) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    let start = 0
    const step = Math.ceil(target / (duration / 16))
    const t = setInterval(() => {
      start = Math.min(target, start + step)
      setVal(start)
      if (start >= target) clearInterval(t)
    }, 16)
    return () => clearInterval(t)
  }, [target, duration])
  return val
}

export function HeroSection() {
  const bgRef = useRef<HTMLCanvasElement>(null)
  const minted = useCountUp(MOCK_STATE.minted)

  useEffect(() => {
    const canvas = bgRef.current
    if (!canvas) return
    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      const ctx = canvas.getContext('2d')
      if (!ctx) return
      renderPiece(ctx, canvas.width, 'orbital', 99999)
    }
    resize()
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [])

  const pct = (MOCK_STATE.minted / COLLECTION.totalSupply * 100).toFixed(1)

  return (
    <section className={styles.hero}>
      <div className={styles.gridBg} />
      <div className={styles.canvasWrap}>
        <canvas ref={bgRef} className={styles.bgCanvas} />
        <div className={styles.canvasFade} />
      </div>

      <div className={styles.content}>
        <div className={styles.badge}>
          <span className={styles.dot} />
          LIVE MINT — GEN.0 — {pct}% MINTED
        </div>

        <h1 className={styles.title}>
          <span className={styles.line1}>PURE</span>
          <span className={styles.line2}>MATHEMATICS</span>
          <span className={styles.line3}>ON CHAIN</span>
        </h1>

        <p className={styles.sub}>
          10,000 unique artworks generated entirely from code —
          no layers, no traits, no AI images. Every piece lives
          forever on the blockchain, born from equations at the
          moment of mint.
        </p>

        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statVal}>{minted.toLocaleString()}</span>
            <span className={styles.statLabel}>MINTED</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.stat}>
            <span className={styles.statVal}>{COLLECTION.totalSupply.toLocaleString()}</span>
            <span className={styles.statLabel}>TOTAL SUPPLY</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.stat}>
            <span className={styles.statVal}>${COLLECTION.mintPrice.toFixed(2)}</span>
            <span className={styles.statLabel}>MINT PRICE</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.stat}>
            <span className={styles.statVal} style={{ color: 'var(--gold)' }}>
              ${MOCK_STATE.patronPool.toFixed(2)}
            </span>
            <span className={styles.statLabel}>PATRON POOL</span>
          </div>
        </div>

        <div className={styles.progressWrap}>
          <div className={styles.progressBar}>
            <div className={styles.progressFill} style={{ width: `${pct}%` }} />
          </div>
        </div>

        <div className={styles.btns}>
          <Link href="/mint" className="btn btn-primary">START MINTING</Link>
          <Link href="/patron" className="btn btn-outline">HOW PATRON WORKS</Link>
        </div>
      </div>
    </section>
  )
}
