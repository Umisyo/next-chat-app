import { FirebaseError } from 'firebase/app'
import { getDatabase, onChildAdded, ref } from 'firebase/database'
import { NextRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { MessageObject } from '~/component/feature/Chat/types/MessageObject'

const db = getDatabase()

export const useGetChats = (router: NextRouter) => {
  const [chatList, setChatList] = useState<MessageObject[]>([])
  const groupName = router.query.groupName
  useEffect(() => {
    if (router.isReady) {
      try {
        if (!groupName) {
          setChatList([])
        }
        const messagesRef = ref(db, 'groups/' + groupName + '/messages')
        return onChildAdded(messagesRef, (snapshot) => {
          const value = snapshot.val()
          setChatList((prev) => [...prev, value])
        })
      } catch (e) {
        if (e instanceof FirebaseError) {
          console.error(e)
        }
        return
      }
    }
  }, [router])
  return chatList
}
