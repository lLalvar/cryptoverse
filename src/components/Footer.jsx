import styles from '../styles/Footer.module.css'

const Footer = () => {
  const year = new Date().getFullYear()
  return (
    <footer className={styles.footer}>
      <h4>Copyright &copy; {year} Lalvar</h4>
      <h5>All Rights Reserved.</h5>
    </footer>
  )
}

export default Footer
