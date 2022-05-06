import React from 'react'
import styles from '../styles/NewsCards.module.css'
import newsThumbnail from '../assets/newsThumbnail.png'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { useSelector } from 'react-redux'
import { SpinnerDotted } from 'spinners-react'

const NewsCard = ({ length }) => {
  const loading = useSelector((state) => state.news.loading)
  const news = useSelector((state) => state.news.news)
  dayjs.extend(relativeTime)

  if (loading) {
    return (
      <div className={styles.loading}>
        <SpinnerDotted size={70} thickness={180} speed={100} color='#1e90ff' />
      </div>
    )
  }

  const newsCount = news.slice(0, length)

  return (
    <div className={styles.newsCards}>
      {newsCount.map((item) => (
        <div key={item.url} className={styles.card}>
          <a
            href={item.url}
            target='_blank'
            rel='noreferrer'
            className={styles.cardWrapper}
          >
            <div className={styles.title}>
              <h4>{item.name}</h4>
              <img
                src={item?.image?.thumbnail?.contentUrl || newsThumbnail}
                alt=''
              />
            </div>
            <p className={styles.description}>
              {item.description.length > 100
                ? `${item.description.slice(0, 100)}...`
                : item.description}
            </p>
            <div className={styles.sourceWrapper}>
              <div className={styles.source}>
                <img
                  src={
                    item.provider[0]?.image?.thumbnail?.contentUrl ||
                    newsThumbnail
                  }
                  alt='source icon'
                  className={styles.sourceIcon}
                />
                <p>{item.provider[0].name}</p>
              </div>
              <p>{dayjs().to(dayjs(item.datePublished))}</p>
            </div>
          </a>
        </div>
      ))}
    </div>
  )
}

export default NewsCard
