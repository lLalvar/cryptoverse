import styles from '../styles/Cryptocurrencies.module.css'
import CryptoCards from './CryptoCards'
import { useSelector, useDispatch } from 'react-redux'
import { searchCoin, searchText } from '../features/cryptosSlice'
import { SpinnerDotted } from 'spinners-react'

const Cryptocurrencies = () => {
  const loading = useSelector((state) => state.cryptos.loading)
  const dispatch = useDispatch()
  const searchedCoins = useSelector((state) => state.cryptos?.coins)
  const searchedText = useSelector((state) => state.cryptos.searchText)

  const handleChange = (e) => {
    const value = e.target.value
    const filteredCoins = searchedCoins.filter((crypto) => {
      return crypto.name.toLowerCase().includes(value.toLowerCase())
    })
    dispatch(searchCoin(filteredCoins))
    dispatch(searchText(value))
  }

  return (
    <div className='container'>
      <input
        value={searchedText}
        onChange={handleChange}
        type='text'
        className={styles.input}
        placeholder='Search Cryptocurrencies'
      />
      <CryptoCards length={100} />
    </div>
  )
}

export default Cryptocurrencies
