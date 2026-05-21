'use client'
import { formatEther }       from 'viem'
import { useMint }           from '@/hooks/useMint'
import { ConnectWallet }     from '@/components/web3/ConnectWallet'
import { COLLECTION }        from '@/lib/constants'
import styles                from './MintWidget.module.css'

export function MintWidget() {
  const {
    quantity, setQuantity,
    isWritePending, isConfirming, isConfirmed,
    price, totalCost, patronPool, isPatronQty,
    minted, remaining, active,
    mint, isConnected, txHash,
  } = useMint()

  const pct = ((minted / COLLECTION.totalSupply) * 100).toFixed(1)

  async function handleMint() {
    try { await mint() }
    catch (e: unknown) {
      alert(e instanceof Error ? e.message : 'Mint failed')
    }
  }

  const isBusy = isWritePending || isConfirming

  return (
    <div className={styles.widget}>
      {/* Progress */}
      <div className={styles.progress}>
        <div className={styles.progressLabels}>
          <span>{minted.toLocaleString()} / {COLLECTION.totalSupply.toLocaleString()} MINTED</span>
          <span>{pct}%</span>
        </div>
        <div className={styles.progressBar}>
          <div className={styles.progressFill} style={{ width: `${pct}%` }} />
        </div>
      </div>

      {/* Quantity */}
      <div className={styles.counterSection}>
        <div className={styles.counterLabel}>QUANTITY</div>
        <div className={styles.counterRow}>
          <button
            className={styles.countBtn}
            onClick={() => setQuantity(q => Math.max(1, q - 1))}
            disabled={isBusy}
          >−</button>
          <div className={styles.countDisplay}>{quantity}</div>
          <button
            className={styles.countBtn}
            onClick={() => setQuantity(q => Math.min(COLLECTION.maxPerTx, q + 1))}
            disabled={isBusy}
          >+</button>
        </div>
        <div className={styles.maxNote}>MAX {COLLECTION.maxPerTx} PER TX</div>
      </div>

      {/* Price breakdown */}
      <div className={styles.priceTable}>
        {[
          { label: 'PRICE PER PIECE', val: `${formatEther(price)} ETH` },
          { label: 'QUANTITY',        val: `×${quantity}` },
          { label: 'TOTAL',           val: `${formatEther(totalCost)} ETH`, bold: true },
          { label: '→ PATRON POOL (10%)', val: `${formatEther(patronPool)} ETH`, gold: true },
        ].map(row => (
          <div key={row.label} className={styles.priceRow}>
            <span className={styles.priceLabel}>{row.label}</span>
            <span
              className={styles.priceVal}
              style={{
                color:      row.gold ? 'var(--gold)' : row.bold ? 'var(--text)' : undefined,
                fontWeight: row.bold ? 700 : undefined,
              }}
            >{row.val}</span>
          </div>
        ))}
      </div>

      {/* Patron alert */}
      {isPatronQty && (
        <div className={styles.patronAlert}>
          <div className={styles.patronAlertTitle}>★ EARLY PATRON STATUS</div>
          <div className={styles.patronAlertBody}>
            Minting {quantity} pieces qualifies you as an Early Patron.
            You will earn a proportional share of the 10% Patron Pool from all future mints.
          </div>
        </div>
      )}

      {/* Connect or Mint */}
      {!isConnected ? (
        <div className={styles.connectWrap}>
          <ConnectWallet />
          <div className={styles.connectNote}>Connect your wallet to mint</div>
        </div>
      ) : !active ? (
        <div className={styles.notActive}>MINT IS NOT ACTIVE YET</div>
      ) : isConfirmed ? (
        <div className={styles.success}>
          <div className={styles.successTitle}>✓ MINTED SUCCESSFULLY</div>
          <div className={styles.successBody}>
            Your piece is on-chain forever.
            <a
              href={`https://sepolia.etherscan.io/tx/${txHash}`}
              target="_blank" rel="noreferrer"
              className={styles.txLink}
            >
              View on Etherscan ↗
            </a>
          </div>
          <button className={styles.mintBtn} onClick={() => window.location.reload()}>
            MINT ANOTHER
          </button>
        </div>
      ) : (
        <button
          className={`${styles.mintBtn} ${isBusy ? styles.mintBtnBusy : ''}`}
          onClick={handleMint}
          disabled={isBusy}
        >
          {isWritePending ? 'CONFIRM IN WALLET...' :
           isConfirming   ? 'CONFIRMING...' :
           `MINT ${quantity} PIECE${quantity > 1 ? 'S' : ''} — ${formatEther(totalCost)} ETH`}
        </button>
      )}

      <div className={styles.mintNote}>
        Ethereum · Gas not included · Max {COLLECTION.maxPerTx} per tx
      </div>
    </div>
  )
}
