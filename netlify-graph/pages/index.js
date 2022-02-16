import Head from 'next/head'
import Header from '@components/Header'
import Footer from '@components/Footer'
import Spotify from './SpotifyFeaturedForm'

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Next.js Starter!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header title="Welcome to my app!" />
        <p className="description">
          Get started Netlify
        </p>
      </main>
        <Spotify></Spotify>
      <Footer />
    </div>
  )
}
