import { useRouter } from 'next/router'
import { FormEvent, useEffect, useState } from 'react'
import { useAuthContext } from '~/component/feature/Auth/AuthProvider'
import { useGetChats } from '~/component/feature/Chat/hooks/useGetChats.hooks'
import { useIsRedirect } from '~/component/feature/Chat/hooks/useIsGroupExit.hooks'
import { usePostMessage } from '~/component/feature/Chat/hooks/usePostMessage.hooks'
import Button from '~/component/ui/Button'

export default function Chat() {
  const router = useRouter()
  const groupName = router.query.groupName
  const isRedirect = useIsRedirect
  const postMessage = usePostMessage
  const userName = useAuthContext().user?.displayName || 'Anonymous'
  const [message, setMessage] = useState<string>('')

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (message) {
      await postMessage(router, message, userName)
    }
  }

  useEffect(() => {
    if (router.isReady) {
      ;(async () => {
        if (typeof groupName !== 'string' || (await isRedirect(groupName))) {
          router.replace('/404')
          return
        }
      })()
    }
  }, [router])

  return (
    <>
      <p>{groupName}</p>
      {useGetChats(router).map((chat, index) => {
        if (chat) {
          return (
            <div key={index}>
              <p>{chat.message}</p>
            </div>
          )
        }
      })}
      <form className="flex w-full" onSubmit={handleSubmit}>
        <input
          type="text"
          className="w-full"
          placeholder="なにか投稿してみましょう"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button type="submit">Send</Button>
      </form>
    </>
  )
}
