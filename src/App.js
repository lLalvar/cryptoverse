import './App.css'
import Home from './components/Home'
import Navbar from './components/Navbar'
import Cryptocurrencies from './components/Cryptocurrencies'
import CryptoDetails from './components/CryptoDetails'
import News from './components/News'
import Footer from './components/Footer'
import useFetchCryptos from './api/useFetchCryptos'
import useFetchNews from './api/useFetchNews'
import { Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {
  setGlobalCryptoStats,
  setCoins,
  setLoading,
  searchCoin,
} from './features/cryptosSlice'
import { setNews, setLoading as setNewsLoading } from './features/newsSlice'

function App() {
  const dispatch = useDispatch()
  const { cryptos, loading } = useFetchCryptos()
  const { news, loading: newsLoading } = useFetchNews()

  useEffect(() => {
    dispatch(setGlobalCryptoStats(cryptos.stats))
    dispatch(setCoins(cryptos.coins))
    dispatch(searchCoin(cryptos.coins))
    dispatch(setLoading(loading))
    dispatch(setNews(news))
    dispatch(setNewsLoading(newsLoading))
  }, [cryptos, news])

  return (
    <div className='App'>
      <Navbar />
      <div className='main'>
        <Routes>
          <Route path='/' element={<Home news={news} />} />
          <Route path='/cryptocurrencies' element={<Cryptocurrencies />} />
          <Route path='/crypto/:coinId' element={<CryptoDetails />} />
          <Route path='/news' element={<News />} />
        </Routes>
        <Footer />
      </div>
    </div>
  )
}

export default App
