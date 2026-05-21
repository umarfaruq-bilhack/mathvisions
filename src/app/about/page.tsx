import { ALGOS } from '@/lib/engine'
import { COLLECTION } from '@/lib/constants'
import styles from './AboutPage.module.css'

const RARITY_COLOR: Record<string, string> = {
  Common: '#555566', Uncommon: '#7c6fff', Rare: '#f0b429', Legendary: '#ff6eb4'
}

export default function AboutPage() {
  return (
    <div className={styles.page}>
      {/* Hero */}
      <div className={styles.hero}>
        <span className="tag">// ABOUT THE PROJECT</span>
        <h1 className="section-title" style={{ marginBottom: 20 }}>
          Art from<br />Pure Mathematics
        </h1>
        <p className={styles.heroSub}>
          Mathematical Visions is a collection of 10,000 generative artworks born from code.
          No AI images. No pre-made layers. No trait rarity tables. Just algorithms, equations,
          and deterministic randomness — permanently archived on Ethereum.
        </p>
      </div>

      {/* Philosophy */}
      <section className={styles.section}>
        <span className="tag">// PHILOSOPHY</span>
        <div className={styles.philosophyGrid}>
          {[
            {
              title: 'CODE IS THE ART',
              body: 'The algorithm is not a tool for making art — it is the art. Each piece is defined entirely by mathematical relationships. What you own is not an image file. You own a seed and access to the computation that transforms it.',
            },
            {
              title: 'ON-CHAIN FOREVER',
              body: 'The generative script lives in the smart contract bytecode. No IPFS. No external CDN. No server. Calling tokenURI() returns a fully self-contained HTML page that runs the algorithm using your token hash as entropy. The art exists as long as Ethereum exists.',
            },
            {
              title: 'DETERMINISTIC UNIQUENESS',
              body: 'Your transaction hash seeds the RNG. The same seed always produces the same output — making ownership verifiable and the piece reproducible. But no two transaction hashes are alike, so no two pieces will ever be identical.',
            },
            {
              title: 'COLLECTORS AS STAKEHOLDERS',
              body: 'The Patron Dividend system transforms early collectors into long-term stakeholders. 10% of every mint fee flows to a pool shared among those who minted 10 or more pieces. Art and investment aligned in a single on-chain mechanism.',
            },
          ].map(p => (
            <div key={p.title} className={styles.philosophyCard}>
              <div className={styles.philTitle}>{p.title}</div>
              <div className={styles.philBody}>{p.body}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Tech stack */}
      <section className={`${styles.section} ${styles.sectionDark}`}>
        <span className="tag">// TECHNICAL DETAILS</span>
        <h2 className="section-title" style={{ marginBottom: 48 }}>Under the Hood</h2>
        <div className={styles.techGrid}>
          {[
            { k: 'STANDARD',          v: 'ERC-721' },
            { k: 'NETWORK',           v: COLLECTION.network },
            { k: 'TOTAL SUPPLY',      v: '10,000' },
            { k: 'MINT PRICE',        v: `$${COLLECTION.mintPrice.toFixed(2)} USD` },
            { k: 'MAX PER TX',        v: String(COLLECTION.maxPerTx) },
            { k: 'PATRON THRESHOLD',  v: `${COLLECTION.patronThreshold} pieces` },
            { k: 'PATRON POOL',       v: '10% of mint fees' },
            { k: 'SECONDARY ROYALTY', v: '5% (4.5% treasury + 0.5% patron pool)' },
            { k: 'METADATA',          v: 'Fully on-chain, no IPFS' },
            { k: 'ALGORITHM STORAGE', v: 'Contract bytecode' },
            { k: 'RNG',               v: 'Mulberry32 seeded by tx hash' },
            { k: 'CONTRACT',          v: 'Non-upgradeable, audited' },
          ].map(row => (
            <div key={row.k} className={styles.techRow}>
              <span className={styles.techKey}>{row.k}</span>
              <span className={styles.techVal}>{row.v}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Algorithms */}
      <section className={styles.section}>
        <span className="tag">// ALGORITHM FAMILIES</span>
        <h2 className="section-title" style={{ marginBottom: 12 }}>The Mathematics</h2>
        <p className={styles.algoSub}>
          Each token is assigned an algorithm family deterministically from its seed.
          Within each family, continuous parameters vary across their full range.
        </p>
        <div className={styles.algoGrid}>
          {ALGOS.map(algo => (
            <div key={algo.key} className={styles.algoCard}>
              <div className={styles.algoTop}>
                <span className={styles.algoKey}>∑ {algo.key.toUpperCase()}</span>
                <span style={{ fontSize: 8, color: RARITY_COLOR[algo.rarity], letterSpacing: '0.1em' }}>
                  {algo.rarity.toUpperCase()}
                </span>
              </div>
              <div className={styles.algoName}>{algo.name}</div>
              <div className={styles.algoDesc}>{algo.desc}</div>
              <div className={styles.algoFormula}>{algo.formula}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
