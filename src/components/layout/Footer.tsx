import Link from 'next/link'
import styles from './Footer.module.css'

const CONTRACT = '0xA86b9C9Ffe77B291bb2D33C2dc67ccBF7BD8f2Cc'

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.grid}>
        <div className={styles.brand}>
          <div className={styles.logo}>MATH<span>.</span>VISIONS</div>
          <p className={styles.tagline}>
            10,000 generative artworks born from pure mathematics.
            Every piece lives on-chain, forever.
          </p>
          <div className={styles.socials}>
            <a href="#" className={styles.social}>TWITTER</a>
            <a href="#" className={styles.social}>DISCORD</a>
            <a href="#" className={styles.social}>GITHUB</a>
          </div>
        </div>
        <div>
          <div className={styles.colTitle}>COLLECTION</div>
          <ul className={styles.colLinks}>
            <li><Link href="/gallery">Gallery</Link></li>
            <li><Link href="/mint">Mint</Link></li>
            <li><Link href="/about">Algorithms</Link></li>
            <li><a href="https://opensea.io/collection/mathematical-visions" target="_blank" rel="noreferrer">OpenSea ↗</a></li>
          </ul>
        </div>
        <div>
          <div className={styles.colTitle}>PATRON</div>
          <ul className={styles.colLinks}>
            <li><Link href="/patron">How It Works</Link></li>
            <li><Link href="/patron#leaderboard">Leaderboard</Link></li>
            <li><Link href="/patron">Claim Dividends</Link></li>
            <li><a href={`https://etherscan.io/address/${CONTRACT}`} target="_blank" rel="noreferrer">Smart Contract ↗</a></li>
          </ul>
        </div>
        <div>
          <div className={styles.colTitle}>RESOURCES</div>
          <ul className={styles.colLinks}>
            <li><a href={`https://etherscan.io/address/${CONTRACT}`} target="_blank" rel="noreferrer">Etherscan ↗</a></li>
            <li><a href="#">Whitepaper</a></li>
            <li><a href="#">Audit Report</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>
      </div>
      <div className={styles.bottom}>
        <span>© 2026 MATHEMATICAL VISIONS — ALL RIGHTS RESERVED</span>
        <span>CONTRACT: {CONTRACT.slice(0,6)}...{CONTRACT.slice(-4)} · ETH MAINNET</span>
      </div>
    </footer>
  )
}
