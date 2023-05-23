import { Comment, CommentBody, Tweet } from '../typings'
import TimeAgo from 'react-timeago'
import {
  ChatAlt2Icon,
  HeartIcon,
  SwitchHorizontalIcon,
  UploadIcon,
} from '@heroicons/react/outline'
import { fetchComments } from '../utils/fetchComments'
import { MouseEvent, useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import toast from 'react-hot-toast'

interface Props {
  tweet: Tweet
}

function Tweet({ tweet }: Props) {
  const { data: session } = useSession()

  const [comments, setComments] = useState<Comment[]>([])
  const [commentBoxOpen, setCommentBoxOpen] = useState<boolean>(false)
  const [input, setInput] = useState<string>('')

  const refreshComments = async () => {
    const comments: Comment[] = await fetchComments(tweet._id)
    setComments(comments)
  }

  useEffect(() => {
    refreshComments()
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const commentToast = toast.loading('Posting Comment...')

    // Comment logic
    const comment: CommentBody = {
      text: input,
      tweetId: tweet._id,
      username: session?.user?.name || 'Unknown User',
      profileImage: session?.user?.image || 'https://links.papareact.com/gll',
    }

    const result = await fetch(`/api/addComment`, {
      body: JSON.stringify(comment),
      method: 'POST',
    })

    
    setInput('')
    setCommentBoxOpen(false)
    refreshComments()
  }

  return (
    <div className="flex flex-col space-x-3 border-y border-gray-100 p-5">
      <div className="flex space-x-3">
        <img
          className="h-10 w-10 rounded-full object-cover"
          src={tweet.profileImage}
          alt=""
        />

        <div>
          <div className="flex items-center space-x-1">
            <p className="mr-1 font-bold">{tweet.username}</p>
            <p className="hidden text-sm text-gray-500 sm:inline">
              @{tweet.username.replace(/\s+/g, '').toLocaleLowerCase()} ·
            </p>

            <TimeAgo
              className="text-xs text-gray-500"
              date={tweet._createdAt}
            />
          </div>

          <p className="pt-1">{tweet.text}</p>

          {tweet.tweetImage && (
            <img
              className="m-5 ml-0 mb-0 max-h-60 rounded-lg object-cover shadow-sm"
              src={tweet.tweetImage}
              alt=""
            />
          )}
        </div>
      </div>

      <div className="mt-5 flex justify-between space-x-3 text-gray-400">
        <div
          onClick={() => session && setCommentBoxOpen(!commentBoxOpen)}
          className="flex cursor-pointer items-center space-x-2"
        >
          <ChatAlt2Icon className="h-5 w-5" />
          <p className="text-sm">{comments.length}</p>
        </div>
        <SwitchHorizontalIcon className="h-5 w-5 cursor-pointer" />
        <HeartIcon className="h-5 w-5 cursor-pointer" />
        <UploadIcon className="h-5 w-5 cursor-pointer" />
      </div>

      {commentBoxOpen && (
        <form className="mt-3 flex space-x-3" onSubmit={handleSubmit}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 rounded-lg bg-gray-100 p-2 outline-none"
            type="text"
            placeholder="Write a comment..."
          />
          <button
            disabled={!input}
            className="text-twitter-blue disabled:text-gray-200"
            type="submit"
          >
            Post
          </button>
        </form>
      )}

      {comments?.length > 0 && (
        <div className="my-2 mt-5 max-h-44 space-y-5 overflow-y-scroll border-t border-gray-100 p-5">
          {comments.map((comment) => (
            <div key={comment._id} className="relative flex space-x-2">
              <hr className="absolute left-5 top-10 h-8 border-x" />
              <img
                className="mt-2 h-7 w-7 rounded-full object-cover"
                src={comment.profileImage}
                alt=""
              />
              <div className="">
                <div className="flex items-center space-x-1">
                  <p className="mr-1 font-bold">{comment.username}</p>
                  <p className="hidden text-sm text-gray-500 lg:inline">
                    @{comment.username.replace(/\s+/g, '').toLocaleLowerCase()}{' '}
                    ·
                  </p>
                  <TimeAgo
                    className="text-xs text-gray-500"
                    date={comment._createdAt}
                  />
                </div>
                <p>{comment.text}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
export default Tweet
