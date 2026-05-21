import type { Metadata } from 'next'
import '@/styles/globals.css'
import { Nav }          from '@/components/layout/Nav'
import { Footer }       from '@/components/layout/Footer'
import { Web3Provider } from '@/components/web3/Web3Provider'

export const metadata: Metadata = {
  title: 'Mathematical Visions — GEN.0',
  description: '10,000 generative artworks born from pure mathematics. Every piece lives on-chain, forever. Early patrons earn 10% of all future mint fees.',
  keywords: ['NFT', 'generative art', 'on-chain', 'mathematics', 'blockchain'],
  openGraph: {
    title: 'Mathematical Visions — GEN.0',
    description: '10,000 unique artworks generated from code. No layers, no AI. Pure mathematics on-chain.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Web3Provider>
          <Nav />
          <main>{children}</main>
          <Footer />
        </Web3Provider>
      </body>
    </html>
  )
}
