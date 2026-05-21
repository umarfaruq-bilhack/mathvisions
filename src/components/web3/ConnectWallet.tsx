'use client'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import styles            from './ConnectWallet.module.css'

export function ConnectWallet() {
  return (
    <ConnectButton.Custom>
      {({ account, chain, openAccountModal, openChainModal, openConnectModal, mounted }) => {
        const ready = mounted
        if (!ready) return null

        if (!account || !chain) {
          return (
            <button className={styles.btn} onClick={openConnectModal}>
              CONNECT WALLET
            </button>
          )
        }

        if (chain.unsupported) {
          return (
            <button className={`${styles.btn} ${styles.wrong}`} onClick={openChainModal}>
              WRONG NETWORK
            </button>
          )
        }

        return (
          <div className={styles.connected}>
            <button className={styles.chain} onClick={openChainModal}>
              {chain.name}
            </button>
            <button className={styles.account} onClick={openAccountModal}>
              {account.displayBalance ? `${account.displayBalance} · ` : ''}
              {account.displayName}
            </button>
          </div>
        )
      }}
    </ConnectButton.Custom>
  )
}
