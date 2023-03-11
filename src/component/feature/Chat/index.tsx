import { useRouter } from 'next/router'
import { FormEvent, useEffect, useState } from 'react'
import { useAuthContext } from '~/component/feature/Auth/AuthProvider'
import { useGetChats } from '~/component/feature/Chat/hooks/useGetChats.hooks'
import { useIsRedirect } from '~/component/feature/Chat/hooks/useIsGroupExit.hooks'
import { usePostMessage } from '~/component/feature/Chat/hooks/usePostMessage.hooks'
import MessageItem from '~/component/feature/Chat/messageItem'
import Button from '~/component/ui/Button'

export default function Chat() {
  const router = useRouter()
  const groupName = router.query.groupName
  const isRedirect = useIsRedirect
  const postMessage = usePostMessage
  const user = useAuthContext().user
  const [message, setMessage] = useState<string>('')

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (message && user) {
      await postMessage(router, message, user)
    }
  }

  useEffect(() => {
    if (router.isReady) {
      ; (async () => {
        if (typeof groupName !== 'string' || (await isRedirect(groupName))) {
          router.replace('/404')
          return
        }
      })()
    }
  }, [router])

  return (
    <div className='h-screen'>
      <div className='pb-8'>
        {useGetChats(router).map((chat, index) => {
          if (chat) {
            return (
              <MessageItem key={index} message={chat} />
            )
          }
        })}
      </div>
      <form className="flex w-full fixed bottom-0 left-0 right-0 bg-cyan-400" onSubmit={handleSubmit}>
        <input
          type="text"
          className="w-full h-8"
          placeholder="なにか投稿してみましょう"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button type="submit">Send</Button>
      </form>
    </div>
  )
}
