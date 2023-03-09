import { FirebaseError } from 'firebase/app'
import { getDatabase, ref, onChildAdded, onChildRemoved } from 'firebase/database'
import { useState, useEffect } from 'react'
import { GroupObject } from '~/component/feature/GroupList/types/GroupObject'

const isGroupObject = (value: { groupName: any; updatedAt: any; }): value is GroupObject => {
  return value && value.groupName && value.updatedAt;
}

export const useGroupList = () => {
  const [groupList, setGroupList] = useState<GroupObject[]>([])

  useEffect(() => {
    try {
      const db = getDatabase()
      const dbRef = ref(db, 'groups')
      return () => {
        onChildAdded(dbRef, (snapshot) => {
          if (snapshot.exists()) {
            const group = {
              groupName: snapshot.key,
              latestEntry: snapshot.val().GroupLastMessage,
              updatedAt: new Date(snapshot.val().createdAt),
            }
            if (isGroupObject(group)) {
              setGroupList(prev => [...prev, group])
            }
          }
        })
        onChildRemoved(dbRef, (snapshot) => {
          if (snapshot.exists()) {
            const group = {
              groupName: snapshot.key,
              latestEntry: snapshot.val().GroupLastMessage,
              updatedAt: new Date(snapshot.val().createdAt),
            }
            if (isGroupObject(group)) {
              setGroupList(prev => prev.filter(g => g.groupName !== group.groupName))
            }
          }
        })
      }
    } catch (e) {
      if (e instanceof FirebaseError) {
        console.error(e)
      }
      return
    }
  }, [])

  return groupList
}