'use client'
import { useState } from 'react'
import { FAQS } from '@/lib/constants'
import styles from './FaqSection.module.css'

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <section className={styles.section}>
      <span className="tag">// FREQUENTLY ASKED</span>
      <h2 className="section-title" style={{ marginBottom: 48 }}>Questions</h2>
      <div className={styles.list}>
        {FAQS.map((item, i) => (
          <div key={i} className={`${styles.item} ${open === i ? styles.open : ''}`}>
            <button className={styles.q} onClick={() => setOpen(open === i ? null : i)}>
              <span>{item.q}</span>
              <span className={styles.toggle}>{open === i ? '−' : '+'}</span>
            </button>
            <div className={styles.a}>{item.a}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
