import { FirebaseError } from 'firebase/app'
import { User } from 'firebase/auth'
import { getDatabase, ref, push, update } from 'firebase/database'
import { NextRouter } from 'next/router'
import { toast } from 'react-toastify'
import { MessageObject } from '~/component/feature/Chat/types/MessageObject'

const db = getDatabase()

export const usePostMessage = async (
  router: NextRouter,
  message: string,
  user: User,
) => {
  const groupName = router.query.groupName
  if (!groupName) {
    return
  }
  try {
    const messageRef = ref(db, 'groups/' + groupName + '/messages')
    const dateRef = ref(db, 'groups/' + groupName)
    const newMessage: MessageObject = {
      message: message,
      sendUserName: user.displayName ? user.displayName : '',
      sendUserAvatar: user.photoURL ? user.photoURL : '',
    }
    await push(messageRef, newMessage)
    await update(dateRef, { updatedAt: new Date().toString() })
  } catch (e) {
    if (e instanceof FirebaseError) {
      toast.error(e.message)
    }
  }
}
