import styles from './header.module.scss'

export function Header() {
  return (
    <header  className={styles.headerContainer}>
      <div>
        <img src="/images/Logo.svg" alt="logo" />
      </div>
    </header>
  )
}
