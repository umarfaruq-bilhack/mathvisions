'use client'
import { useState } from 'react'
import { PieceCanvas } from '@/components/canvas/PieceCanvas'
import { GALLERY_SEEDS, ALGOS, AlgoKey, getParams, getTokenHash } from '@/lib/engine'
import styles from './GalleryPage.module.css'

type Filter = 'ALL' | AlgoKey

export default function GalleryPage() {
  const [filter, setFilter] = useState<Filter>('ALL')
  const [modal, setModal]   = useState<number | null>(null)

  const pieces = GALLERY_SEEDS.map((item, idx) => ({
    ...item,
    idx,
    params: getParams(item.algo, item.seed),
    algoInfo: ALGOS.find(a => a.key === item.algo)!,
  }))

  const filtered = filter === 'ALL' ? pieces : pieces.filter(p => p.algo === filter)

  const selected = modal !== null ? pieces[modal] : null

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <div>
          <span className="tag">// COLLECTION</span>
          <h1 className="section-title">Gallery</h1>
        </div>
        <div className={styles.count}>{filtered.length} PIECES</div>
      </div>

      <div className={styles.filters}>
        <button
          className={`${styles.filterBtn} ${filter === 'ALL' ? styles.active : ''}`}
          onClick={() => setFilter('ALL')}
        >ALL</button>
        {ALGOS.map(a => (
          <button
            key={a.key}
            className={`${styles.filterBtn} ${filter === a.key ? styles.active : ''}`}
            onClick={() => setFilter(a.key as Filter)}
          >{a.key}</button>
        ))}
      </div>

      <div className={styles.grid}>
        {filtered.map(piece => (
          <div key={piece.idx} className={styles.item} onClick={() => setModal(piece.idx)}>
            <PieceCanvas algoKey={piece.algo} seed={piece.seed} size={220} />
            <div className={styles.overlay}>
              <div className={styles.itemId}>#{String(piece.idx + 1).padStart(4, '0')}</div>
              <div className={styles.itemName}>{piece.algoInfo.name}</div>
              <div className={styles.itemParams}>
                {Object.entries(piece.params).map(([k,v]) => `${k}=${v}`).join(' ')}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selected && (
        <div className={styles.modalOverlay} onClick={() => setModal(null)}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <button className={styles.modalClose} onClick={() => setModal(null)}>×</button>
            <div className={styles.modalCanvas}>
              <PieceCanvas algoKey={selected.algo} seed={selected.seed} size={460} />
            </div>
            <div className={styles.modalInfo}>
              <div className={styles.modalId}>
                #{String(selected.idx + 1).padStart(4, '0')} · {selected.algoInfo.rarity}
              </div>
              <h2 className={styles.modalName}>{selected.algoInfo.name}</h2>
              <div className={styles.modalMeta}>
                {Object.entries(selected.params).map(([k, v]) => (
                  <div key={k} className={styles.metaRow}>
                    <span className={styles.metaKey}>{k}</span>
                    <span className={styles.metaVal}>{v}</span>
                  </div>
                ))}
                <div className={styles.metaRow}>
                  <span className={styles.metaKey}>seed</span>
                  <span className={styles.metaVal}>{selected.seed}</span>
                </div>
                <div className={styles.metaRow}>
                  <span className={styles.metaKey}>hash</span>
                  <span className={styles.metaVal} style={{ color: 'var(--dim)', fontSize: 9 }}>
                    {getTokenHash(selected.seed)}
                  </span>
                </div>
              </div>
              <a href="/mint" className={`btn btn-primary ${styles.modalMintBtn}`}>
                MINT THIS PIECE — $0.50
              </a>
              <div className={styles.modalDesc}>{selected.algoInfo.desc}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
