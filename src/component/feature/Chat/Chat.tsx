import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useGetChats } from '~/component/feature/Chat/hooks/useGetChats.hooks';
import { useIsRedirect } from '~/component/feature/Chat/hooks/useIsGroupExit.hooks';

export default function Chat() {
  const router = useRouter();
  const groupName = router.query.groupName;
  const isRedirect = useIsRedirect
  const chats = useGetChats(groupName);

  useEffect(() => {
    if (router.isReady) {
      (async () => {
        if (typeof groupName !== 'string' || await isRedirect(groupName)) {
          router.replace('/404')
          return
        }
      }
      )()
    }
  }, [router])

  return (
    <>
      <p>{groupName}</p>
      {chats.map((chat, index) => {
        if (chat) {
          return <p key={index}>{chat}</p>
        }
      })}
    </>
  )
}