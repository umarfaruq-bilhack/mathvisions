'use client'
import Link            from 'next/link'
import { usePathname } from 'next/navigation'
import { useState }    from 'react'
import { ConnectWallet } from '@/components/web3/ConnectWallet'
import styles          from './Nav.module.css'

const LINKS = [
  { href: '/gallery', label: 'GALLERY'  },
  { href: '/mint',    label: 'MINT'     },
  { href: '/patron',  label: 'PATRON'   },
  { href: '/about',   label: 'ABOUT'    },
]

export function Nav() {
  const path = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <nav className={styles.nav}>
      <Link href="/" className={styles.logo}>
        MATH<span>.</span>VISIONS
      </Link>

      <ul className={`${styles.links} ${open ? styles.open : ''}`}>
        {LINKS.map(l => (
          <li key={l.href}>
            <Link
              href={l.href}
              className={`${styles.link} ${path === l.href ? styles.active : ''}`}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>

      <div className={styles.right}>
        <ConnectWallet />
      </div>

      <button
        className={`${styles.burger} ${open ? styles.burgerOpen : ''}`}
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
      >
        <span /><span /><span />
      </button>
    </nav>
  )
}
