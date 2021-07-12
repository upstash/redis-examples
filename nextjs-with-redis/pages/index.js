import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Redis from 'ioredis'
import { useState } from 'react'

let redis = new Redis(process.env.REDIS_URL)

export default function Home({ data }) {
  const [count, setCount] = useState(data)

  const increment = async () => {
    const response = await fetch('/api/incr', { method: 'POST' })
    const data = await response.json()
    setCount(data.count)
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico"/>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to my website
        </h1>

        <p className={styles.description}>
          Get started by editing <code>pages/index.js</code>
        </p>

        <p className={styles.description}>
          View Count: <b>{count}</b>
        </p>

        <button type="button" onClick={increment}>Manual Increment (+1)</button>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com/integrations/upstash"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by <b>Vercel</b> and <b>Upstash</b>
        </a>
      </footer>
    </div>
  )
}

export async function getServerSideProps() {
  const data = await redis.incr('counter')
  return { props: { data } }
}
