import { FirebaseError } from 'firebase/app';
import { getDatabase, onChildAdded, ref } from 'firebase/database';
import { useEffect, useState } from 'react';

export const useGetChats = (groupName: string | string[] | undefined) => {
  const [chatList, setChatList] = useState<string[]>([])
  useEffect(() => {
    try {
      const db = getDatabase()
      const messagesRef = ref(db, "groups/" + groupName + "/messages");
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
  }, [groupName])
  return chatList
}