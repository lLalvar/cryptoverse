import { useState, useEffect } from 'react'
import axios from 'axios'

const useFetchCoin = (coinId) => {
  const [loading, setLoading] = useState(true)
  const [coin, setCoin] = useState({})

  const options = {
    method: 'GET',
    url: `https://coinranking1.p.rapidapi.com/coin/${coinId}`,
    params: { referenceCurrencyUuid: 'yhjMzLPhuIDl', timePeriod: '24h' },
    headers: {
      'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com',
      'X-RapidAPI-Key': '3e7e15a25fmsh4caae2daa8aa641p171f9djsnf5d68d15d58e',
    },
  }

  const fetchCoin = async () => {
    try {
      const { data } = await axios(options)
      setCoin(data.data.coin)
    } catch (error) {
      console.log(error)
      setLoading(true)
      return
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchCoin()
  }, [])

  return { coin, loading }
}

export default useFetchCoin
