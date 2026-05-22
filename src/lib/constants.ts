export const COLLECTION = {
  name: 'Mathematical Visions',
  symbol: 'MVIS',
  totalSupply: 10_000,
  mintPrice: 0.50,       // USD
  patronThreshold: 10,   // minimum mints for patron status
  patronPoolPct: 0.10,   // 10% of every mint to patron pool
  artistPct: 0.90,
  secondaryRoyalty: 0.05,
  maxPerTx: 50,
  contract: '0xcca459b9C20F388F9675908D7b92F54223454555',
  network: 'Ethereum Mainnet',
  chainId: 1,
}

export const MOCK_STATE = {
  minted: 247,
  patronPool: 12.35,
}

export const LEADERBOARD = [
  { addr: '0x3f4a...c891', minted: 120, dividend: 72.00,  patron: true },
  { addr: '0x7b2e...11fa', minted: 85,  dividend: 51.00,  patron: true },
  { addr: '0xa91c...d334', minted: 60,  dividend: 36.00,  patron: true },
  { addr: '0x0012...88ab', minted: 45,  dividend: 27.00,  patron: true },
  { addr: '0xc44f...7720', minted: 32,  dividend: 19.20,  patron: true },
  { addr: '0x8e1a...bc02', minted: 28,  dividend: 16.80,  patron: true },
  { addr: '0x5f90...4411', minted: 22,  dividend: 13.20,  patron: true },
  { addr: '0x2317...99cd', minted: 18,  dividend: 10.80,  patron: true },
  { addr: '0xde56...3391', minted: 15,  dividend: 9.00,   patron: true },
  { addr: '0x61bc...770e', minted: 12,  dividend: 7.20,   patron: true },
  { addr: '0xaa23...ff11', minted: 10,  dividend: 6.00,   patron: true },
  { addr: '0x99dd...2234', minted: 8,   dividend: 0,      patron: false },
]

export const FAQS = [
  {
    q: 'What makes this collection different from other NFT projects?',
    a: 'Every piece is generated entirely from mathematics — no pre-made layers, no AI images, no off-chain assets. The generative algorithm lives in the smart contract. Your transaction hash seeds the output, meaning no one knows what you\'ll receive until the moment of mint.',
  },
  {
    q: 'How does the Patron Dividend work exactly?',
    a: 'When you mint 10 or more pieces, your wallet is registered as an Early Patron in the smart contract. 10% of every subsequent mint fee flows into the Patron Pool. Your share = (your mints ÷ all patron mints) × pool balance. Claim via a single contract call anytime.',
  },
  {
    q: 'Is the art stored on IPFS?',
    a: 'No. The algorithm is stored directly in smart contract bytecode on Ethereum mainnet. tokenURI() returns a fully self-contained HTML page with the algorithm embedded and your token hash as the seed. No external dependencies — ever.',
  },
  {
    q: 'What wallet do I need?',
    a: 'Any Ethereum-compatible wallet — MetaMask, Coinbase Wallet, Rainbow, or any WalletConnect-compatible wallet. You\'ll need ETH for the mint price ($0.50 USD equivalent) plus gas.',
  },
  {
    q: 'Can I mint 10+ across multiple transactions?',
    a: 'Yes. Patron status is cumulative. The contract tracks your wallet\'s total mint count across all transactions. Once you cross 10, Patron status is permanent and retroactive.',
  },
  {
    q: 'What happens when the collection sells out?',
    a: 'The Patron Pool stops accumulating new fees, but your accrued balance remains claimable forever. The contract is non-upgradeable — no one can change the withdrawal logic or remove funds.',
  },
  {
    q: 'Will there be secondary market royalties?',
    a: '5% on secondary sales: 4.5% to artist treasury, 0.5% to Patron Pool. Early Patrons continue earning from secondary market activity indefinitely.',
  },
]
