import { FirebaseError } from 'firebase/app'
import { getDatabase, ref, push, set, update } from 'firebase/database'
import { NextRouter } from 'next/router'
import { toast } from 'react-toastify'
import { MessageObject } from '~/component/feature/Chat/types/MessageObject'

export const usePostMessage = async (router: NextRouter, message: string, user: string) => {
  const groupName = router.query.groupName
  if (!groupName) {
    return
  }
  try {
    const db = getDatabase()
    const messageRef = ref(db, "groups/" + groupName + "/messages")
    const newMessage: MessageObject = {
      message: message,
      sendUser: user
    }
    await push(messageRef, newMessage)
  } catch (e) {
    if (e instanceof FirebaseError) {
      toast.error(e.message)
    }
  }
}