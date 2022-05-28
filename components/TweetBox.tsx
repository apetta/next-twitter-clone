import {
  CalendarIcon,
  EmojiHappyIcon,
  LocationMarkerIcon,
  PhotographIcon,
  SearchCircleIcon,
} from '@heroicons/react/outline'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { Dispatch, MouseEvent, SetStateAction, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { Tweet, TweetBody } from '../typings'
import { fetchTweets } from '../utils/fetchTweets'

interface Props {
  setTweets: Dispatch<SetStateAction<Tweet[]>>
}

function TweetBox({ setTweets }: Props) {
  const [input, setInput] = useState<string>('')
  const [image, setImage] = useState<string>('')

  const { data: session } = useSession()

  const [imageUrlBoxOpen, setImageUrlBoxOpen] = useState<boolean>(false)
  const imageUrlRef = useRef<HTMLInputElement>(null)

  const addImageToTweet = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault()
    if (!imageUrlRef.current?.value) return

    setImage(imageUrlRef.current.value)
    setImageUrlBoxOpen(false)
  }

  const postTweet = async () => {
    const tweetInfo: TweetBody = {
      text: input,
      tweetImage: image,
      username: session?.user?.name || 'unknown',
      profileImage: session?.user?.image || '/twitter-profile.png',
    }

    const result = await fetch('/api/addTweet', {
      body: JSON.stringify(tweetInfo),
      method: 'POST',
    })

    const json = await result.json()

    const newTweets = await fetchTweets()
    setTweets(newTweets)

    toast('Tweet posted!', {
      icon: '🚀',
    })

    return
  }

  const handleSubmit = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault()
    if (!input) return

    postTweet()

    setInput('')
    setImage('')
    setImageUrlBoxOpen(false)
  }

  return (
    <div className="flex space-x-2 p-5">
      <div className="relative mt-6 h-14 w-14 flex-shrink-0">
        <Image
          className="rounded-full"
          alt=""
          layout="fill"
          src={session?.user?.image || '/twitter-profile.png'}
        />
      </div>

      <div className="flex flex-1 items-center pl-2">
        <form className="flex flex-1 flex-col">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="h-24 w-full text-xl outline-none"
            type="text"
            placeholder="What's happening?"
          />

          <div className="flex items-center">
            <div className="flex flex-1 space-x-2 text-twitter-blue">
              <PhotographIcon
                onClick={() => setImageUrlBoxOpen(!imageUrlBoxOpen)}
                className="h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150"
              />
              <SearchCircleIcon className="h-5 w-5" />
              <EmojiHappyIcon className="h-5 w-5" />
              <CalendarIcon className="h-5 w-5" />
              <LocationMarkerIcon className="h-5 w-5" />
            </div>

            <button
              onClick={handleSubmit}
              disabled={!input || !session}
              className="rounded-full bg-twitter-blue px-5 py-2 font-bold text-white disabled:cursor-not-allowed disabled:opacity-40"
            >
              Tweet
            </button>
          </div>

          {imageUrlBoxOpen && (
            <form className="mt-5 flex rounded-lg bg-twitter-blue/70 py-2 px-4">
              <input
                ref={imageUrlRef}
                className="flex-1 bg-transparent text-white outline-none placeholder:text-white"
                type="text"
                placeholder="Enter image url..."
              />
              <button
                type="submit"
                onClick={(e) => addImageToTweet(e)}
                className="font-bold text-white"
              >
                Add Image
              </button>
            </form>
          )}

          {image && (
            <img
              className="mt-10 h-40 w-full rounded-xl object-contain shadow-lg"
              src={image}
              alt=""
            />
          )}
        </form>
      </div>
    </div>
  )
}
export default TweetBox
