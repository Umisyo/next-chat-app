import { FirebaseError } from 'firebase/app'
import { User } from 'firebase/auth'
import { getDatabase, ref, update, get, set, onChildAdded, onChildRemoved } from 'firebase/database'
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'

export interface GroupObject {
  groupName: string,
  latestEntry?: string,
  updatedAt: string
}


const db = getDatabase()
const dbRef = ref(db, 'groups')
const updatedAt = new Date()

const isGroupsExit = async (): Promise<boolean> => {
  const checkRef = ref(db)
  return await get(checkRef).then((snapshot) => {
    return snapshot.hasChild('groups')
  })
}

const isKeyExit = async (key: string): Promise<boolean> => {
  return await get(dbRef).then((snapshot) => {
    return snapshot.hasChild(key)
  })
}

const isGroupObject = (value: { groupName: any; updatedAt: any; }): value is GroupObject => {
  return value && value.groupName && value.updatedAt;
}

export const useAddGroup = async (newGroup: string, user: User | undefined | null) => {
  const newGroupObject = {
    [newGroup]: {
      createUserId: user?.uid,
      messages: [''],
      updatedAt
    }
  }
  try {
    if (!(await isGroupsExit())) {
      await set(dbRef, newGroupObject)
      return
    }
    if (await isKeyExit(newGroup)) {
      toast.error('同名のグループが既に存在します')
      throw Error;
    }
    await update(dbRef, newGroupObject)
    toast.success('Group Created')
  } catch (e) {
    if (e instanceof FirebaseError) {
      toast.error(e.message)
    }
  }
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
