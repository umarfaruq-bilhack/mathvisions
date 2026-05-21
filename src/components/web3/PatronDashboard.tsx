'use client'
import { formatEther }   from 'viem'
import { usePatron }     from '@/hooks/usePatron'
import { ConnectWallet } from '@/components/web3/ConnectWallet'
import { CONTRACT_ADDRESS } from '@/lib/contract'
import styles            from './PatronDashboard.module.css'

export function PatronDashboard() {
  const {
    mints, isPatron, pendingEth, sharePercent,
    isPending, isConfirming, isConfirmed,
    claim, isConnected, address,
  } = usePatron()

  const isBusy = isPending || isConfirming

  async function handleClaim() {
    try { await claim() }
    catch (e: unknown) {
      alert(e instanceof Error ? e.message : 'Claim failed')
    }
  }

  if (!isConnected) {
    return (
      <div className={styles.panel}>
        <div className={styles.panelTitle}>YOUR PATRON STATUS</div>
        <div className={styles.empty}>
          <ConnectWallet />
          <div className={styles.emptyNote}>Connect wallet to view your status</div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.panel}>
      <div className={styles.panelTitle}>YOUR PATRON STATUS</div>

      <div className={styles.addr}>
        {address?.slice(0, 6)}...{address?.slice(-4)}
      </div>

      <div className={styles.statsGrid}>
        <div className={styles.stat}>
          <div className={styles.statVal}>{mints}</div>
          <div className={styles.statLabel}>PIECES MINTED</div>
        </div>
        <div className={styles.stat}>
          <div
            className={styles.statVal}
            style={{ color: isPatron ? 'var(--gold)' : 'var(--muted)' }}
          >
            {isPatron ? 'ACTIVE' : 'INACTIVE'}
          </div>
          <div className={styles.statLabel}>PATRON STATUS</div>
        </div>
        <div className={styles.stat}>
          <div className={styles.statVal} style={{ color: 'var(--gold)' }}>
            {sharePercent.toFixed(2)}%
          </div>
          <div className={styles.statLabel}>POOL SHARE</div>
        </div>
        <div className={styles.stat}>
          <div className={styles.statVal} style={{ color: 'var(--accent3)' }}>
            {pendingEth} ETH
          </div>
          <div className={styles.statLabel}>CLAIMABLE</div>
        </div>
      </div>

      {!isPatron ? (
        <div className={styles.notPatron}>
          <div className={styles.notPatronTitle}>NOT A PATRON YET</div>
          <div className={styles.notPatronBody}>
            You have minted {mints} piece{mints !== 1 ? 's' : ''}.
            Mint {Math.max(0, 10 - mints)} more to unlock Patron status
            and start earning from the pool.
          </div>
          <a href="/mint" className={styles.mintLink}>MINT MORE →</a>
        </div>
      ) : isConfirmed ? (
        <div className={styles.claimSuccess}>
          <div>✓ DIVIDEND CLAIMED</div>
          <div className={styles.claimSuccessNote}>
            ETH sent to your wallet.
            <a
              href={`https://sepolia.etherscan.io/address/${address}`}
              target="_blank" rel="noreferrer"
              className={styles.txLink}
            >View on Etherscan ↗</a>
          </div>
        </div>
      ) : parseFloat(pendingEth) > 0 ? (
        <button
          className={`${styles.claimBtn} ${isBusy ? styles.claimBtnBusy : ''}`}
          onClick={handleClaim}
          disabled={isBusy}
        >
          {isPending   ? 'CONFIRM IN WALLET...' :
           isConfirming ? 'CONFIRMING...' :
           `CLAIM ${pendingEth} ETH`}
        </button>
      ) : (
        <div className={styles.noPending}>
          <div className={styles.noPendingTitle}>NOTHING TO CLAIM YET</div>
          <div className={styles.noPendingBody}>
            Your dividend accumulates as new collectors mint.
            Check back after more mints occur.
          </div>
        </div>
      )}

      <div className={styles.contractLink}>
        <a
          href={`https://sepolia.etherscan.io/address/${CONTRACT_ADDRESS}`}
          target="_blank" rel="noreferrer"
        >
          VIEW CONTRACT ↗
        </a>
      </div>
    </div>
  )
}
