import { getDatabase, ref, push, set, update } from 'firebase/database'
import { NextRouter } from 'next/router'
import { MessageObject } from '~/component/feature/Chat/types/MessageObject'

export const usePostMessage = async (router: NextRouter, message: string, user: string) => {
  const groupName = router.query.groupName
  if (!groupName) {
    return
  }
  try {
    console.log('call')
    const db = getDatabase()
    const messageRef = ref(db, "groups/" + groupName + "/messages")
    console.log(messageRef)
    const newMessage: MessageObject = {
      message: message,
      sendUser: user
    }
    await push(messageRef, newMessage)
  } catch (e) {
    if (e) {
      console.log(e)
    }
  }
}