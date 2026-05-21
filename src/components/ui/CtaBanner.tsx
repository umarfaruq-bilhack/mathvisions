import Link from 'next/link'
import styles from './CtaBanner.module.css'

export function CtaBanner() {
  return (
    <section className={styles.section}>
      <div className={styles.gridBg} />
      <div className={styles.content}>
        <span className="tag" style={{ textAlign: 'center', display: 'block' }}>// DON&apos;T WAIT</span>
        <h2 className={styles.title}>
          Mint early.<br />Earn forever.
        </h2>
        <p className={styles.sub}>
          The Patron Pool grows with every mint. The earlier you are, the larger your proportional share.
          10 pieces is all it takes.
        </p>
        <div className={styles.btns}>
          <Link href="/mint" className="btn btn-primary">MINT NOW — $0.50</Link>
          <Link href="/patron" className="btn btn-outline">VIEW PATRON SYSTEM</Link>
        </div>
        <div className={styles.note}>
          Patron status: mint 10+ pieces · Earn from all future mints · Claim anytime
        </div>
      </div>
    </section>
  )
}
