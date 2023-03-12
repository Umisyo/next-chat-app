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
  const user = useAuthContext().user
  const [message, setMessage] = useState<string>('')
  const scrollBottomRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (message && user) {
      await postMessage(router, message, user)
      setMessage('')
    }
  }

  useRedirect(router)

  useEffect(() => {
    scrollBottomRef?.current?.scrollIntoView()
  }, [])

  return (
    <div className="h-screen flex flex-col">
      <div className="pb-12 mt-auto">
        {useGetChats(router).map((chat, index) => {
          return <MessageItem key={index} message={chat} />
        })}
        <div ref={scrollBottomRef} />
      </div>
      <form
        className="flex w-full fixed bottom-0 left-0 right-0"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          className="w-full h-12 border bg-slate-100 px-1"
          placeholder="なにか投稿してみましょう"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </form>
    </div>
  )
}
