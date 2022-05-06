import React from 'react'
import styles from '../styles/GlobalCryptoStats.module.css'
import millify from 'millify'
import { useSelector } from 'react-redux'
import { SpinnerDotted } from 'spinners-react'

const GlobalCryptoStats = ({}) => {
  const loading = useSelector((state) => state.cryptos?.loading)
  const stats = useSelector((state) => state.cryptos.globalCryptoStats)
  // console.log(stats)

  if (loading) {
    return (
      <div className={styles.loading}>
        <SpinnerDotted size={70} thickness={180} speed={100} color='#1e90ff' />
      </div>
    )
  }

  return (
    <div className={styles.stats}>
      <div className={styles.stat}>
        <h5 className={styles.statTitle}>Total</h5>
        <div className={styles.statValue}>{millify(stats.total)}</div>
      </div>
      <div className={styles.stat}>
        <h5 className={styles.statTitle}>Total Exchanges</h5>
        <div className={styles.statValue}>{millify(stats.totalExchanges)}</div>
      </div>
      <div className={styles.stat}>
        <h5 className={styles.statTitle}>Total Market Cap</h5>
        <div className={styles.statValue}>{millify(stats.totalMarketCap)}</div>
      </div>
      <div className={styles.stat}>
        <h5 className={styles.statTitle}>Total 24h Volume</h5>
        <div className={styles.statValue}>{millify(stats.total24hVolume)}</div>
      </div>
      <div className={styles.stat}>
        <h5 className={styles.statTitle}>Total Cryptocurrencies</h5>
        <div className={styles.statValue}>{millify(stats.totalCoins)}</div>
      </div>
      <div className={styles.stat}>
        <h5 className={styles.statTitle}>Total Markets</h5>
        <div className={styles.statValue}>{millify(stats.totalMarkets)}</div>
      </div>
    </div>
  )
}

export default GlobalCryptoStats
