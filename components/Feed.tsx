import { RefreshIcon } from '@heroicons/react/outline'
import { Tweet } from '../typings'
import TweetBox from './TweetBox'
import TweetComp from '../components/Tweet'
import { fetchTweets } from '../utils/fetchTweets'
import { useState } from 'react'
import toast from 'react-hot-toast'
interface Props {
  tweets: Tweet[]
}

function Feed({ tweets: tweetsProp }: Props) {
  const [tweets, setTweets] = useState<Tweet[]>(tweetsProp)

  const handleRefresh = async () => {
    const refreshToast = toast.loading('Refreshing...')
    const tweets = await fetchTweets()
    setTweets(tweets)

    toast.success('Feed updated!', {
      id: refreshToast,
    })
  }

  return (
    <div className="col-span-10 sm:col-span-11 max-h-screen overflow-y-scroll border-x scrollbar-hide md:col-span-7 lg:col-span-5">
      <div className="sticky top-0 z-50 flex items-center justify-between bg-white bg-opacity-90 pt-3 pb-3">
        <h1 className="items-center pl-5 pb-0 text-center text-xl font-bold">
          Home
        </h1>
        <RefreshIcon
          onClick={handleRefresh}
          className="mr-5 h-8 w-8 cursor-pointer text-twitter-blue transition-all duration-500 ease-out hover:rotate-180 active:scale-125"
        />
      </div>

      <div>
        <TweetBox setTweets={setTweets} />
      </div>
      <div>
        {tweets.map((tweet) => (
          <TweetComp key={tweet._id} tweet={tweet} />
        ))}
      </div>
    </div>
  )
}
export default Feed
