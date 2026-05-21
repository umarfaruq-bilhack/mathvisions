import { ALGOS } from '@/lib/engine'
import styles from './AlgorithmsSection.module.css'

const RARITY_COLOR: Record<string, string> = {
  Common: '#555566', Uncommon: '#7c6fff', Rare: '#f0b429', Legendary: '#ff6eb4',
}

export function AlgorithmsSection() {
  return (
    <section className={styles.section}>
      <span className="tag">// GENERATIVE ALGORITHMS</span>
      <h2 className="section-title" style={{ marginBottom: 12 }}>The Mathematics</h2>
      <p className={styles.sub}>
        Nine distinct algorithm families. Each token is seeded by its transaction hash —
        unpredictable, unrepeatable, entirely mathematical.
      </p>
      <div className={styles.grid}>
        {ALGOS.map(algo => (
          <div key={algo.key} className={styles.card}>
            <div className={styles.cardTop}>
              <span className={styles.key}>∑ {algo.key.toUpperCase()}</span>
              <span
                className={styles.rarity}
                style={{ color: RARITY_COLOR[algo.rarity] }}
              >
                {algo.rarity}
              </span>
            </div>
            <div className={styles.name}>{algo.name}</div>
            <div className={styles.desc}>{algo.desc}</div>
            <div className={styles.formula}>{algo.formula}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
