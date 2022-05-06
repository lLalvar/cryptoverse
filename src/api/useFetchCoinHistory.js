import { useState, useEffect } from 'react'
import axios from 'axios'

const useFetchCoinHistory = (coinId, timePeriod) => {
  const [coinHistory, setCoinHistory] = useState([])

  const options = {
    method: 'GET',
    url: `https://coinranking1.p.rapidapi.com/coin/${coinId}/history`,
    params: { referenceCurrencyUuid: 'yhjMzLPhuIDl', timePeriod },
    headers: {
      'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com',
      'X-RapidAPI-Key': '3e7e15a25fmsh4caae2daa8aa641p171f9djsnf5d68d15d58e',
    },
  }

  const fetchCoin = async () => {
    try {
      const { data } = await axios(options)
      setCoinHistory(data.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchCoin()
  }, [timePeriod])

  return coinHistory
}

export default useFetchCoinHistory
