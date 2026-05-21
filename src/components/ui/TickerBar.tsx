import styles from './TickerBar.module.css'

const ITEMS = [
  '0x3f4a...c891 MINTED 3 PIECES',
  'PATRON POOL: $12.35',
  '#0247 ORBITAL HARMONY',
  '0x7b2e...11fa — PATRON UNLOCKED',
  '10,000 TOTAL SUPPLY · $0.50 MINT',
  '#0389 FRACTAL DREAMS MINTED',
  '0xa91c...d334 CLAIMED $8.20',
  'FULLY ON-CHAIN — NO IPFS',
  '#0012 SACRED RECURSION',
  'EARLY PATRON = LIFETIME EARNINGS',
  '9 ALGORITHM FAMILIES',
  '0x61bc...770e MINTED 12 PIECES',
]

export function TickerBar() {
  const doubled = [...ITEMS, ...ITEMS]
  return (
    <div className={styles.ticker}>
      <div className={styles.inner}>
        {doubled.map((item, i) => (
          <span key={i} className={styles.item}>
            <span className={styles.dot}>◆</span>
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
