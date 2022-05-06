import styles from '../styles/Navbar.module.css'
import logo from '../assets/logo.png'
import { useState } from 'react'
import { BiNews } from 'react-icons/bi'
import { BsCurrencyExchange } from 'react-icons/bs'
import { FaHome } from 'react-icons/fa'
import { Link, useLocation } from 'react-router-dom'

const Navbar = () => {
  const [show, setShow] = useState()
  const pathname = useLocation().pathname
  const handleHamburgerClick = () => {
    setShow(!show)
  }

  const navItem = [
    {
      link: '/',
      icon: <FaHome />,
      text: 'Home',
      active: pathname === '/' ? styles.active : '',
    },
    {
      link: '/cryptocurrencies',
      icon: <BsCurrencyExchange />,
      text: 'Cryptocurrencies',
      active: pathname === '/cryptocurrencies' ? styles.active : '',
    },
    {
      link: '/news',
      icon: <BiNews />,
      text: 'News',
      active: pathname === '/news' ? styles.active : '',
    },
  ]

  return (
    <div className={styles.container}>
      <div className={styles.desktop}>
        <Link to='/'>
          <div className={styles.logo}>
            <img src={logo} alt='' />
            <div className={styles.logoTitle}>Cryptoverse</div>
          </div>
        </Link>
        <nav>
          <ul>
            {navItem.map((item) => (
              <Link to={item.link} key={item.text}>
                <li className={`${styles.navItem} ${item.active}`}>
                  <div className={styles.navItemWrapper}>
                    {item.icon}
                    {item.text}
                  </div>
                </li>
              </Link>
            ))}
          </ul>
        </nav>
      </div>
      <div className={styles.mobile}>
        <header className={styles.header}>
          <Link to='/'>
            <div className={styles.logo}>
              <img src={logo} alt='' />
              <div className={styles.logoTitle}>Cryptoverse</div>
            </div>
          </Link>
          <div
            onClick={handleHamburgerClick}
            className={
              show ? `${styles.hamburger} ${styles.active}` : styles.hamburger
            }
          >
            <div className={styles.line}></div>
            <div className={styles.line}></div>
            <div className={styles.line}></div>
          </div>
        </header>
        <nav>
          <ul
            onClick={handleHamburgerClick}
            className={
              show ? `${styles.navItems} ${styles.show}` : `${styles.navItems}`
            }
          >
            {navItem.map((item) => (
              <Link to={item.link} key={item.text}>
                <li className={`${styles.navItem} ${item.active}`}>
                  <div className={styles.navItemWrapper}>
                    {item.icon}
                    {item.text}
                  </div>
                </li>
              </Link>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  )
}

export default Navbar
