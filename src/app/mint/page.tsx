'use client'
import { useState, useCallback }  from 'react'
import { PieceCanvas }            from '@/components/canvas/PieceCanvas'
import { MintWidget }             from '@/components/web3/MintWidget'
import { ALGOS, getParams, getTokenHash, AlgoKey } from '@/lib/engine'
import styles                     from './MintPage.module.css'

export default function MintPage() {
  const [seed, setSeed] = useState(() => Math.floor(Math.random() * 999999))
  const [algo, setAlgo] = useState<AlgoKey>('orbital')

  const regen = useCallback(() => {
    setSeed(Math.floor(Math.random() * 999999))
    setAlgo(ALGOS[Math.floor(Math.random() * ALGOS.length)].key)
  }, [])

  const params    = getParams(algo, seed)
  const algoInfo  = ALGOS.find(a => a.key === algo)!

  return (
    <div className={styles.page}>
      <div className={styles.pageInner}>
        <div className={styles.header}>
          <span className="tag">// MINT INTERFACE</span>
          <h1 className="section-title">Mint Your Piece</h1>
        </div>

        <div className={styles.layout}>
          {/* ── LEFT: Preview ── */}
          <div className={styles.previewCol}>
            <div className={styles.previewWrap}>
              <PieceCanvas algoKey={algo} seed={seed} size={500} />
              <div className={styles.previewMeta}>
                <span className={styles.metaAlgo}>{algoInfo.name}</span>
                <span className={styles.metaSep}>·</span>
                <span className={styles.metaSeed}>SEED {seed}</span>
              </div>
              <button className={styles.regenBtn} onClick={regen} title="Preview new piece">↻</button>
            </div>

            <div className={styles.params}>
              {Object.entries(params).map(([k, v]) => (
                <div key={k} className={styles.param}>
                  <span className={styles.paramKey}>{k}</span>
                  <span className={styles.paramVal}>{v}</span>
                </div>
              ))}
              <div className={styles.param}>
                <span className={styles.paramKey}>hash</span>
                <span className={styles.paramVal} style={{ color: 'var(--dim)', fontSize: 9 }}>
                  {getTokenHash(seed)}
                </span>
              </div>
            </div>

            <div className={styles.algoSection}>
              <div className={styles.algoSectionTitle}>PREVIEW ALGORITHM</div>
              <div className={styles.algoGrid}>
                {ALGOS.map(a => (
                  <button
                    key={a.key}
                    className={`${styles.algoBtn} ${algo === a.key ? styles.algoBtnActive : ''}`}
                    onClick={() => { setAlgo(a.key); setSeed(Math.floor(Math.random() * 999999)) }}
                  >
                    {a.key}
                  </button>
                ))}
              </div>
              <p className={styles.algoNote}>
                Preview only — your actual piece is determined by your transaction hash at mint time.
              </p>
            </div>
          </div>

          {/* ── RIGHT: Mint Widget ── */}
          <div className={styles.panelCol}>
            <div className={styles.panelHeader}>
              <div className={styles.panelTitle}>Claim Your Piece</div>
              <p className={styles.panelSub}>
                Each mint produces a unique generative artwork seeded by your transaction hash.
                The art lives in the contract — not IPFS. Forever on-chain.
              </p>
            </div>
            <MintWidget />
          </div>
        </div>
      </div>
    </div>
  )
}
