import { faPaperPlane } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRouter } from 'next/router'
import { FormEvent, useEffect, useRef, useState } from 'react'
import { useAuthContext } from '~/component/feature/Auth/AuthProvider'
import { useGetChats } from '~/component/feature/Chat/hooks/useGetChats.hooks'
import { usePostMessage } from '~/component/feature/Chat/hooks/usePostMessage.hooks'
import useRedirect from '~/component/feature/Chat/hooks/useRedirect.hooks'
import MessageItem from '~/component/feature/Chat/MessageItem'

export default function Chat() {
  const router = useRouter()
  const postMessage = usePostMessage
  const chats = useGetChats()
  const user = useAuthContext().user
  const [message, setMessage] = useState<string>('')
  const scrollBottomRef = useRef<HTMLDivElement>(null)
  const isScrollToBottom = chats.length > 0

  useRedirect(router)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (message && user) {
      const newMessage = message
      setMessage('')
      await postMessage(newMessage, router, user)
    }
  }

  useEffect(() => {
    if (chats.length > 0) {
      scrollBottomRef?.current?.scrollIntoView()
    }
  }, [chats.length])

  return (
    <div className="h-screen flex flex-col">
      <div className="pb-12 mt-auto">
        {chats.map((chat, index) => {
          return <MessageItem key={index} message={chat} />
        })}
        <div ref={scrollBottomRef} />
      </div>
      <form
        className="flex w-full fixed bottom-0 left-0 right-0 bg-slate-100 border"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          className="w-full h-12 px-1 bg-slate-100"
          placeholder="なにか投稿してみましょう"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button aria-label='メッセージを送る' name="send" type="submit" className="w-14">
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>
      </form>
    </div>
  )
}
