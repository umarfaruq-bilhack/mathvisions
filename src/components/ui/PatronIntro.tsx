import Link from 'next/link'
import styles from './PatronIntro.module.css'

export function PatronIntro() {
  return (
    <section className={styles.section}>
      <div className={styles.layout}>
        <div className={styles.left}>
          <span className="tag">// PATRON DIVIDEND SYSTEM</span>
          <h2 className="section-title" style={{ marginBottom: 20 }}>
            Early Minters<br />Earn Forever
          </h2>
          <p className={styles.body}>
            This isn't a PFP drop. Early supporters become stakeholders.
            Mint 10 or more pieces and earn from every future mint —
            permanently, on-chain, claimable anytime.
          </p>
          <div className={styles.steps}>
            {[
              { n: '01', title: 'MINT 10+ PIECES', body: 'Mint at least 10 pieces across any number of transactions. Once you cross the threshold, Patron status is permanent.' },
              { n: '02', title: '10% POOL ACCUMULATES', body: 'Every future mint contributes 10% of its fee to the Patron Pool — held in the smart contract, transparent and immutable.' },
              { n: '03', title: 'CLAIM YOUR SHARE ANYTIME', body: 'Your share = your mints ÷ all patron mints × pool. Claim in one transaction, anytime. More mints = larger share.' },
            ].map(step => (
              <div key={step.n} className={styles.step}>
                <div className={styles.stepNum}>{step.n}</div>
                <div>
                  <div className={styles.stepTitle}>{step.title}</div>
                  <div className={styles.stepBody}>{step.body}</div>
                </div>
              </div>
            ))}
          </div>
          <Link href="/patron" className="btn btn-primary" style={{ marginTop: 8 }}>
            LEARN MORE →
          </Link>
        </div>

        <div className={styles.right}>
          <div className={styles.flowCard}>
            <div className={styles.flowBox}>
              <div className={styles.flowTitle}>COLLECTOR MINTS</div>
              <div className={styles.flowSub}>$0.50 per piece · Any quantity</div>
            </div>
            <div className={styles.arrow}>↓ FEE SPLIT ON-CHAIN</div>
            <div className={styles.splitRow}>
              <div className={`${styles.flowBox} ${styles.accentBox}`}>
                <div className={styles.pct} style={{ color: 'var(--accent)' }}>90%</div>
                <div className={styles.flowTitle}>ARTIST<br />TREASURY</div>
                <div className={styles.flowSub}>Development &amp; marketing</div>
              </div>
              <div className={`${styles.flowBox} ${styles.goldBox}`}>
                <div className={styles.pct}>10%</div>
                <div className={styles.flowTitle}>PATRON<br />POOL</div>
                <div className={styles.flowSub}>Split proportionally to patrons</div>
              </div>
            </div>
            <div className={styles.arrow}>↓ PATRON CLAIMS</div>
            <div className={`${styles.flowBox} ${styles.claimBox}`}>
              <div className={styles.flowTitle} style={{ color: 'var(--gold)' }}>YOUR DIVIDEND</div>
              <div className={styles.formula}>
                share = (your mints ÷ all patron mints) × pool
              </div>
              <div className={styles.flowSub}>Claimable anytime · Accrues forever</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
