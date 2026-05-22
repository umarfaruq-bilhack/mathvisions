// Contract addresses per network
export const CONTRACTS = {
  sepolia: '0xcca459b9C20F388F9675908D7b92F54223454555',
  mainnet: '0x3B3A770e6529C0195B9894902e18062A014293E6',
} as const

export const CONTRACT_ADDRESS = CONTRACTS.mainnet // change to mainnet for launch

// Minimal ABI — only the functions the frontend needs
export const ABI = [
  // Mint
  {
    name: 'mint',
    type: 'function',
    stateMutability: 'payable',
    inputs: [{ name: 'quantity', type: 'uint256' }],
    outputs: [],
  },
  // Claim dividend
  {
    name: 'claimDividend',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [],
    outputs: [],
  },
  // Read: collection stats
  {
    name: 'collectionStats',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [
      { name: 'minted',             type: 'uint256' },
      { name: 'remaining',          type: 'uint256' },
      { name: 'pPool',              type: 'uint256' },
      { name: 'hPool',              type: 'uint256' },
      { name: 'patronMintTotal',    type: 'uint256' },
      { name: 'holderWeightTotal',  type: 'uint256' },
      { name: 'price',              type: 'uint256' },
      { name: 'active',             type: 'bool'    },
    ],
  },
  // Read: patron info
  {
    name: 'patronInfo',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ name: 'wallet', type: 'address' }],
    outputs: [
      { name: 'mints',        type: 'uint256' },
      { name: 'patron',       type: 'bool'    },
      { name: 'pending',      type: 'uint256' },
      { name: 'sharePercent', type: 'uint256' },
    ],
  },
  // Read: pending dividend
  {
    name: 'pendingDividend',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ name: 'patron', type: 'address' }],
    outputs: [{ name: '', type: 'uint256' }],
  },
  // Read: total supply
  {
    name: 'totalSupply',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }],
  },
  // Read: mint price
  {
    name: 'MINT_PRICE',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }],
  },
  // Read: is patron
  {
    name: 'isPatron',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ name: '', type: 'address' }],
    outputs: [{ name: '', type: 'bool' }],
  },
  // Read: patron mints
  {
    name: 'patronMints',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ name: '', type: 'address' }],
    outputs: [{ name: '', type: 'uint256' }],
  },
  // Read: tokenURI
  {
    name: 'tokenURI',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ name: 'tokenId', type: 'uint256' }],
    outputs: [{ name: '', type: 'string' }],
  },
  // Events
  {
    name: 'Transfer',
    type: 'event',
    inputs: [
      { name: 'from',    type: 'address', indexed: true },
      { name: 'to',      type: 'address', indexed: true },
      { name: 'tokenId', type: 'uint256', indexed: true },
    ],
  },
  {
    name: 'Minted',
    type: 'event',
    inputs: [
      { name: 'to',      type: 'address', indexed: true  },
      { name: 'tokenId', type: 'uint256', indexed: true  },
      { name: 'seed',    type: 'bytes32', indexed: false },
    ],
  },
  {
    name: 'PatronRegistered',
    type: 'event',
    inputs: [
      { name: 'patron',     type: 'address', indexed: true  },
      { name: 'totalMints', type: 'uint256', indexed: false },
    ],
  },
  {
    name: 'DividendClaimed',
    type: 'event',
    inputs: [
      { name: 'patron', type: 'address', indexed: true  },
      { name: 'amount', type: 'uint256', indexed: false },
    ],
  },
] as const
