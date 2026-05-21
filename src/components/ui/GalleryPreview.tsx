'use client'
import Link from 'next/link'
import { useState } from 'react'
import { PieceCanvas } from '@/components/canvas/PieceCanvas'
import { GALLERY_SEEDS, ALGOS, getParams, getTokenHash } from '@/lib/engine'
import styles from './GalleryPreview.module.css'

export function GalleryPreview() {
  const [selected, setSelected] = useState<number | null>(null)
  const preview = GALLERY_SEEDS.slice(0, 12)

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div>
          <span className="tag">// COLLECTION PREVIEW</span>
          <h2 className="section-title">The Collection</h2>
        </div>
        <p className={styles.sub}>
          Each output is deterministic from its seed.
          Same seed → same art. Forever.
        </p>
      </div>

      <div className={styles.grid}>
        {preview.map(({ seed, algo }, idx) => {
          const algoInfo = ALGOS.find(a => a.key === algo)!
          const params = getParams(algo, seed)
          const paramStr = Object.entries(params)
            .map(([k, v]) => `${k}=${v}`)
            .join(' ')

          return (
            <div
              key={idx}
              className={`${styles.item} ${selected === idx ? styles.selected : ''}`}
              onClick={() => setSelected(selected === idx ? null : idx)}
            >
              <PieceCanvas algoKey={algo} seed={seed} size={240} />
              <div className={styles.overlay}>
                <div className={styles.itemId}>#{String(idx + 1).padStart(4, '0')}</div>
                <div className={styles.itemName}>{algoInfo.name}</div>
                <div className={styles.itemParams}>{paramStr} seed={seed}</div>
                <div className={styles.itemHash}>{getTokenHash(seed)}</div>
              </div>
            </div>
          )
        })}
      </div>

      <div className={styles.footer}>
        <Link href="/gallery" className="btn btn-outline">
          VIEW FULL GALLERY →
        </Link>
      </div>
    </section>
  )
}
