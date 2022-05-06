import styles from '../styles/Home.module.css'
import CryptoCards from './CryptoCards'
import NewsCards from './NewsCards'
import { Link } from 'react-router-dom'
import GlobalCryptoStats from './GlobalCryptoStats'
import { useSelector } from 'react-redux'

const Home = () => {
  const loading = useSelector((state) => state.cryptos?.loading)

  return (
    <div className='container'>
      <h1 className={styles.globalCryptoStatsTitle}>Global Crypto Stats</h1>
      <GlobalCryptoStats />
      <div className={styles.title}>
        <h1>Top 10 Cryptos In The World</h1>
        <Link to='/cryptocurrencies'>
          <h3>Show more</h3>
        </Link>
      </div>
      {!loading && <CryptoCards length={10} />}
      <div className={styles.title}>
        <h2>Latest Crypto News</h2>
        <Link to='/news'>
          <h3>Show more</h3>
        </Link>
      </div>
      <NewsCards length={6} />
    </div>
  )
}

export default Home
