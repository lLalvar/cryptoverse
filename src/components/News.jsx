import React from 'react'
import NewsCards from './NewsCards'
import styles from '../styles/News.module.css'

const News = ({ news }) => {
  return (
    <div className='container'>
      <h1 className={styles.title}>Latest Crypto News</h1>
      <NewsCards news={news} length={20} />
    </div>
  )
}

export default News
