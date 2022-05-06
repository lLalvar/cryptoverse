import { useState, useEffect } from 'react'
import axios from 'axios'

const useFetchNews = () => {
  const [loading, setLoading] = useState(true)
  const [news, setNews] = useState([])
  const check = JSON.parse(localStorage.getItem('news'))
  const day = new Date().getDay()

  const options = {
    method: 'GET',
    url: 'https://bing-news-search1.p.rapidapi.com/news/search',
    params: {
      q: 'cryptocurrency  news',
      count: '20',
      freshness: 'Day',
      textFormat: 'Raw',
      safeSearch: 'Off',
    },
    headers: {
      'X-BingApis-SDK': 'true',
      'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com',
      'X-RapidAPI-Key': '3e7e15a25fmsh4caae2daa8aa641p171f9djsnf5d68d15d58e',
    },
  }
  const fetchNews = async () => {
    if (check) {
      if (check.day === day) {
        setNews(check.data)
        setLoading(false)
      } else {
        const { data } = await axios(options)
        setNews(data.value)
        localStorage.setItem('news', JSON.stringify({ day, data: data.value }))
        setLoading(false)
      }
    } else {
      try {
        const { data } = await axios(options)
        setNews(data.value)
        localStorage.setItem('news', JSON.stringify({ day, data: data.value }))
        setLoading(false)
      } catch (error) {
        console.log(error)
        setLoading(true)
        return
      }
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchNews()
  }, [])

  return { news, loading }
}

export default useFetchNews
