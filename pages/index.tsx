import type { GetServerSideProps } from 'next'
import Head from 'next/head'
import { Toaster } from 'react-hot-toast'
import Feed from '../components/Feed'
import Sidebar from '../components/Sidebar'
import Widgets from '../components/Widgets'
import { Tweet } from '../typings'
import { fetchTweets } from '../utils/fetchTweets'

interface Props {
  tweets: Tweet[]
}

const Home = ({ tweets }: Props) => {
  return (
    <div className="mx-auto max-h-screen min-w-[320px] overflow-hidden lg:max-w-6xl">
      <Head>
        <title>Twitter Clone</title>
        <link rel="icon" href="/twitter-logo.svg" />
      </Head>
      <Toaster />

      <main className="grid grid-cols-12 md:grid-cols-9">
        <Sidebar />

        <Feed tweets={tweets} />

        <Widgets />
      </main>
    </div>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async (context) => {
  const tweets = await fetchTweets()

  return {
    props: {
      tweets,
    },
  }
}
