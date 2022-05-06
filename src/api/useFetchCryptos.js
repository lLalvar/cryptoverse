import { useState, useEffect } from 'react'
import axios from 'axios'

const useFetchCryptos = () => {
  const [cryptos, setCryptos] = useState([])
  const [loading, setLoading] = useState(true)

  const options = {
    method: 'GET',
    url: 'https://coinranking1.p.rapidapi.com/coins',
    params: {
      referenceCurrencyUuid: 'yhjMzLPhuIDl',
      timePeriod: '24h',
      tiers: '1',
      orderBy: 'marketCap',
      orderDirection: 'desc',
      limit: '100',
      offset: '0',
    },
    headers: {
      'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com',
      'X-RapidAPI-Key': '3e7e15a25fmsh4caae2daa8aa641p171f9djsnf5d68d15d58e',
    },
  }

  const fetchCryptos = async () => {
    setLoading(true)
    try {
      const { data } = await axios(options)
      setCryptos(data.data)
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchCryptos()
  }, [])

  // console.log(cryptos)
  return { cryptos, loading }
}

export default useFetchCryptos
