import { Comment } from '../typings'

export const fetchComments = async (tweetId: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/getComments?tweetId=${tweetId}`
  )
  const tweets: Comment[] = await response.json()

  return tweets
}
