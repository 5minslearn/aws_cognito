import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from './page.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
      </div>

      <div className={styles.center}>
        <Image
          src="/5minslearn.png"
          alt="5minslearn Logo"
          width={200}
          height={200}
        />
      </div>
      <h2 className={inter.className}>
           Hello World!
          </h2>

      <div className={styles.center}>
        

        <a
          href="https://5minslearn.gogosoon.com/?ref=github_nextjs_app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={inter.className}>
            5minslearn <span>-&gt;</span>
          </h2>
          <p className={inter.className}>Learn tech in 5mins</p>
        </a>

        
      </div>
    </main>
  )
}
