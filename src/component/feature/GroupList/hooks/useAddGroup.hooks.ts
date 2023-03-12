import { FirebaseError } from 'firebase/app'
import { User } from 'firebase/auth'
import { getDatabase, ref, get, set, update } from 'firebase/database'
import { toast } from 'react-toastify'

const db = getDatabase()
const dbRef = ref(db, 'groups')
const updatedAt = new Date().toString()

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

export const useAddGroup = async (
  newGroup: string,
  user: User | undefined | null,
) => {
  const newGroupObject = {
    [newGroup]: {
      createUserId: user?.uid,
      updatedAt,
    },
  }
  try {
    if (newGroup.trim().length === 0) {
      throw new Error('グループ名を入力してください')
    }
    if (!(await isGroupsExit())) {
      await set(dbRef, newGroupObject)
      return
    }
    if (await isKeyExit(newGroup)) {
      throw new Error('同名のグループが既に存在します')
    }
    await update(dbRef, newGroupObject)
    toast.success('Group Created')
  } catch (e) {
    if (e instanceof Error || e instanceof FirebaseError) {
      toast.error(e.message)
    }
  }
}
