import type { NextPage } from 'next'
import Head from 'next/head'
import App from './App'

const Home: NextPage = () => {
  return (    
  <div>
      <Head>
        <title>Twitter Art Gallery</title>
        <meta property="og:title" content="Twitter Art Gallery" key="title" />
      </Head>
      <App />
    </div>
  )
}

export default Home
