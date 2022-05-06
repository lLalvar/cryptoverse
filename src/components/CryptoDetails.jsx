import React, { useState } from 'react'
import styles from '../styles/CryptoDetails.module.css'
import millify from 'millify'
import parse from 'html-react-parser'
import { RiExchangeCnyLine, RiHashtag } from 'react-icons/ri'
import { BsLightningCharge } from 'react-icons/bs'
import { BiTrophy, BiLineChart, BiDollarCircle } from 'react-icons/bi'
import { HiOutlineExclamationCircle } from 'react-icons/hi'
import { Line } from 'react-chartjs-2'
import dayjs from 'dayjs'
import { useParams } from 'react-router-dom'
import useFetchCoin from '../api/useFetchCoin'
import useFetchCoinHistory from '../api/useFetchCoinHistory'
import { SpinnerDotted } from 'spinners-react'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
)

const CryptoDetails = () => {
  const coinId = useParams().coinId
  const coinPrice = []
  const coinTimestamp = []
  const { coin, loading } = useFetchCoin(coinId)
  const [timePeriod, setTimePeriod] = useState('24h')
  const coinHistory = useFetchCoinHistory(coinId, timePeriod)

  const time = ['24h', '7d', '30d', '1y', '3m', '3y', '5y']

  for (let i = 0; i < coinHistory?.history?.length; i++) {
    coinPrice.unshift(coinHistory?.history[i].price)
    if (timePeriod === '24h') {
      coinTimestamp.unshift(
        dayjs.unix(coinHistory?.history[i].timestamp).format('HH:mm A')
      )
    } else {
      coinTimestamp.unshift(
        dayjs.unix(coinHistory?.history[i].timestamp).format('YYYY.MM.DD')
      )
    }
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        onClick: false,
      },
    },
  }

  const data = {
    labels: coinTimestamp,

    datasets: [
      {
        label: 'Price In USD',
        data: coinPrice,
        borderColor: '#1e90ff',
        backgroundColor: '#1e90ff',
      },
    ],
  }

  const handleClick = (e) => {
    setTimePeriod(e.target.value)
  }

  if (loading) {
    return (
      <div className={styles.loading}>
        <SpinnerDotted size={70} thickness={180} speed={100} color='#1e90ff' />
      </div>
    )
  }

  return (
    <div className='container'>
      <div className={styles.title}>
        <h1>
          {coin?.name} ({coin?.symbol}) Price
        </h1>
        <p>
          {coin?.name} live price in US Dollar (USD). View value statistics,
          market cap and supply.
        </p>
      </div>
      <div className={styles.chart}>
        <select onClick={handleClick}>
          {time.map((time) => (
            <option key={time} value={time}>
              {time}
            </option>
          ))}
        </select>
        <div className={styles.chartTitle}>
          <h2>Bitcoin Price Chart</h2>
          <div>
            <h4>Change: {coinHistory?.change}%</h4>
            <h4>
              Current {coin?.name} Price: ${coin?.price && millify(coin.price)}
            </h4>
          </div>
        </div>
        <Line data={data} options={options} />
      </div>
      <div className={styles.info}>
        <div className={styles.statistic}>
          <h2>{coin?.name} Value Statistics</h2>
          <p className={styles.desc}>
            An overview showing the statistics of {coin?.name}, such as the base
            and quote currency, the rank, and trading volume.
          </p>
          <ul>
            <li className={styles.item}>
              <BiDollarCircle className={styles.icon} />
              <div>Price to USD</div>
              <div>{coin?.price && millify(coin.price)}</div>
            </li>
            <li className={styles.item}>
              <RiHashtag className={styles.icon} />
              <div>Rank</div>
              <div>{coin?.rank}</div>
            </li>
            <li className={styles.item}>
              <BsLightningCharge className={styles.icon} />
              <div>24h Volume</div>
              <div>{coin?.['24hVolume'] && millify(coin?.['24hVolume'])}</div>
            </li>
            <li className={styles.item}>
              <BiDollarCircle className={styles.icon} />
              <div>Market Cap</div>
              <div>{coin?.marketCap && millify(coin.marketCap)}</div>
            </li>
            <li className={styles.item}>
              <BiTrophy className={styles.icon} />
              <div>All-time-high(daily avg.)</div>
              <div>
                {coin?.allTimeHigh?.price && millify(coin.allTimeHigh.price)}
              </div>
            </li>
          </ul>
        </div>
        <div className={styles.statistic}>
          <h2>Other Stats Info</h2>
          <p className={styles.desc}>
            An overview showing the statistics of {coin?.name}, such as the base
            and quote currency, the rank, and trading volume.
          </p>
          <ul>
            <li className={styles.item}>
              <BiLineChart className={styles.icon} />
              <div>Number Of Markets</div>
              <div>
                {coin?.numberOfMarkets && millify(coin.numberOfMarkets)}
              </div>
            </li>
            <li className={styles.item}>
              <RiExchangeCnyLine className={styles.icon} />
              <div>Number Of Exchanges</div>
              <div>{coin?.numberOfExchanges}</div>
            </li>
            <li className={styles.item}>
              <HiOutlineExclamationCircle className={styles.icon} />
              <div>Aprroved Supply</div>
              <div>{coin?.supply?.confirmed ? 'Yes' : 'No'}</div>
            </li>
            <li className={styles.item}>
              <HiOutlineExclamationCircle className={styles.icon} />
              <div>Total Supply</div>
              <div>{coin?.supply?.total && millify(coin.supply.total)}</div>
            </li>
            <li className={styles.item}>
              <HiOutlineExclamationCircle className={styles.icon} />
              <div>Circulating Supply</div>
              <div>
                {coin?.supply?.circulating && millify(coin.supply.circulating)}
              </div>
            </li>
          </ul>
        </div>
        <div className={styles.statistic}>
          <h2>What is {coin?.name}?</h2>
          <div>{parse(coin?.description)}</div>
        </div>
        <div className={styles.statistic}>
          <h2>{coin?.name} Links</h2>
          <ul>
            {coin?.links?.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target='_blank'
                rel='noreferrer'
              >
                <li className={`${styles.item} ${styles.linksItem}`}>
                  <div>{link.type}</div>
                  <div className={styles.linkName}>{link.name}</div>
                </li>
              </a>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default CryptoDetails
