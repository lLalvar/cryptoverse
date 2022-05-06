import styles from '../styles/CryptoCards.module.css'
import millify from 'millify'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { SpinnerDotted } from 'spinners-react'

const CryptoCards = ({ length }) => {
  const loading = useSelector((state) => state.cryptos?.loading)
  const coins = useSelector((state) =>
    state?.cryptos?.searchCoin?.slice(0, length)
  )

  if (loading) {
    return (
      <div className={styles.loading}>
        <SpinnerDotted size={70} thickness={180} speed={100} color='#1e90ff' />
      </div>
    )
  }

  return (
    <>
      <div className={styles.cards}>
        {coins?.map((coin) => (
          <div key={coin.uuid} className={styles.cardWrapper}>
            <Link to={`/crypto/${coin.uuid}`}>
              <div className={styles.card}>
                <div className={styles.title}>
                  <h4>
                    {coin.rank}. {coin.name}
                  </h4>
                  <img src={coin.iconUrl} alt='' />
                </div>
                <p>Price: {millify(coin.price)}</p>
                <p>Market Cap: {millify(coin.marketCap)}</p>
                <p>Daily Change: {coin.change}%</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  )
}

export default CryptoCards
