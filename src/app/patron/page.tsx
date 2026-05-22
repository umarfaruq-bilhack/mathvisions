'use client'
import { useState }          from 'react'
import { useReadContract }   from 'wagmi'
import { PatronDashboard }   from '@/components/web3/PatronDashboard'
import { COLLECTION }        from '@/lib/constants'
import { ABI, CONTRACT_ADDRESS } from '@/lib/contract'
import { formatEther }       from 'viem'
import styles                from './PatronPage.module.css'

export default function PatronPage() {
  const [simMints,   setSimMints]   = useState(5000)
  const [simYours,   setSimYours]   = useState(20)
  const [simPatrons, setSimPatrons] = useState(200)

  const { data: stats } = useReadContract({
    address:      CONTRACT_ADDRESS as `0x${string}`,
    abi:          ABI,
    functionName: 'collectionStats',
  })

  const poolWei = stats ? (stats as any)[2] : BigInt(0)
  const poolEth = parseFloat(formatEther(poolWei ?? BigInt(0)))

  const pool  = simMints * COLLECTION.mintPrice * COLLECTION.patronPoolPct
  const share = (simYours / Math.max(simPatrons, simYours)) * pool

  return (
    <div className={styles.page}>
      {/* Hero */}
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <span className="tag">// PATRON DIVIDEND SYSTEM</span>
          <h1 className="section-title" style={{ marginBottom: 20 }}>
            Mint Early.<br />Earn Forever.
          </h1>
          <p className={styles.heroSub}>
            The first generative NFT collection where early supporters become permanent stakeholders.
            Mint 10+ pieces and earn from every future mint — on-chain, proportional, claimable anytime.
          </p>
          <div className={styles.heroStats}>
            {[
              { val: poolEth > 0 ? `${poolEth.toFixed(6)} ETH` : '0.0000 ETH', label: 'CURRENT POOL' },
              { val: '10%',  label: 'POOL SHARE'             },
              { val: '10',   label: 'MIN. MINTS FOR PATRON'  },
              { val: '∞',    label: 'CLAIM WINDOW'           },
            ].map(s => (
              <div key={s.label} className={styles.heroStat}>
                <span className={styles.heroStatVal}>{s.val}</span>
                <span className={styles.heroStatLabel}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Your Status + How It Works */}
      <section className={styles.section}>
        <div className={styles.twoCol}>
          <div>
            <span className="tag">// HOW IT WORKS</span>
            <h2 className="section-title" style={{ marginBottom: 32 }}>Three Steps</h2>
            <div className={styles.stepsGrid}>
              {[
                {
                  n: '01', title: 'MINT 10+ PIECES',
                  body: 'Mint at least 10 pieces across any number of transactions. Once you cross 10, Patron status is permanent — even if you sell your pieces.',
                  badge: 'THRESHOLD: 10 PIECES'
                },
                {
                  n: '02', title: '10% POOL ACCUMULATES',
                  body: 'Every mint sends 10% of its fee to the Patron Pool smart contract. Fully visible on-chain. Grows with every new collector.',
                  badge: '10% OF ALL FUTURE MINT FEES'
                },
                {
                  n: '03', title: 'CLAIM ANYTIME',
                  body: 'Your share = your mints ÷ total patron mints × pool balance. One transaction, anytime. Minting more increases your share permanently.',
                  badge: 'PROPORTIONAL · PERMANENT'
                },
              ].map(step => (
                <div key={step.n} className={styles.stepCard}>
                  <div className={styles.stepNum}>{step.n}</div>
                  <div className={styles.stepTitle}>{step.title}</div>
                  <div className={styles.stepBody}>{step.body}</div>
                  <span className={styles.stepBadge}>{step.badge}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <span className="tag">// YOUR STATUS</span>
            <h2 className="section-title" style={{ marginBottom: 24 }}>Dashboard</h2>
            <PatronDashboard />
          </div>
        </div>
      </section>

      {/* Simulator */}
      <section className={`${styles.section} ${styles.sectionDark}`}>
        <span className="tag">// DIVIDEND SIMULATOR</span>
        <h2 className="section-title" style={{ marginBottom: 12 }}>Calculate Your Earnings</h2>
        <p className={styles.simSub}>Adjust the sliders to model your Patron Dividend.</p>

        <div className={styles.simLayout}>
          <div className={styles.simControls}>
            {[
              { label: 'MINTS AFTER YOURS',  min: 0,  max: 9990, step: 10, val: simMints,   set: setSimMints   },
              { label: 'YOU MINTED',         min: 10, max: 500,  step: 1,  val: simYours,   set: setSimYours   },
              { label: 'TOTAL PATRON MINTS', min: 10, max: 2000, step: 10, val: simPatrons, set: setSimPatrons },
            ].map(ctrl => (
              <div key={ctrl.label} className={styles.simRow}>
                <div className={styles.simRowHeader}>
                  <span className={styles.simLabel}>{ctrl.label}</span>
                  <span className={styles.simVal}>{ctrl.val.toLocaleString()}</span>
                </div>
                <input
                  type="range" min={ctrl.min} max={ctrl.max} step={ctrl.step}
                  value={ctrl.val}
                  onChange={e => ctrl.set(+e.target.value)}
                  className={styles.slider}
                />
              </div>
            ))}
          </div>

          <div className={styles.simResult}>
            <div className={styles.simResultLabel}>YOUR PATRON DIVIDEND</div>
            <div className={styles.simResultVal}>${share.toFixed(2)}</div>
            <div className={styles.simBreakdown}>
              {[
                { label: 'Pool balance',   val: `$${pool.toFixed(2)}` },
                { label: 'Your share',     val: `${((simYours / Math.max(simPatrons, simYours)) * 100).toFixed(1)}%` },
                { label: 'Cost to unlock', val: `$${(simYours * COLLECTION.mintPrice).toFixed(2)}` },
                {
                  label: 'Net return',
                  val: `${share > simYours * COLLECTION.mintPrice ? '+' : ''}$${(share - simYours * COLLECTION.mintPrice).toFixed(2)}`,
                  green: share > simYours * COLLECTION.mintPrice,
                },
              ].map(row => (
                <div key={row.label} className={styles.simBreakRow}>
                  <span>{row.label}</span>
                  <span style={{ color: (row as any).green ? 'var(--accent3)' : undefined }}>{row.val}</span>
                </div>
              ))}
            </div>
            <a href="/mint" className="btn btn-primary" style={{ display: 'block', textAlign: 'center', marginTop: 20 }}>
              BECOME A PATRON →
            </a>
          </div>
        </div>
      </section>

      {/* Leaderboard */}
      <section className={styles.section} id="leaderboard">
        <span className="tag">// EARLY PATRON LEADERBOARD</span>
        <h2 className="section-title" style={{ marginBottom: 12 }}>Top Patrons</h2>
        <p className={styles.lbSub}>Wallets ranked by pieces minted. Larger stake = larger dividend.</p>
        <div className={styles.lbTable}>
          <div className={styles.lbHeader}>
            <span>#</span><span>WALLET</span><span>MINTED</span><span>STATUS</span><span>DIVIDEND</span>
          </div>
          <div style={{ padding: '60px 24px', textAlign: 'center', color: 'var(--muted)', letterSpacing: '0.1em', fontSize: 13 }}>
            NO PATRONS YET — MINT 10+ PIECES TO CLAIM THE #1 SPOT
          </div>
        </div>
      </section>
    </div>
  )
}
