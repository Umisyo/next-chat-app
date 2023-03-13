import { NextRouter } from 'next/router'
import { useEffect } from 'react'
import { get, getDatabase, ref } from 'firebase/database'

const db = getDatabase()

const isRedirect = async (key: string) => {
  const dbRef = ref(db, 'groups/' + key)
  return await get(dbRef).then((snapshot) => {
    return snapshot.val() === null
  })
}

export default function useRedirect(router: NextRouter) {
  const groupName = router.query.groupName
  useEffect(() => {
    if (router.isReady) {
      ; (async () => {
        if (typeof groupName !== 'string' || (await isRedirect(groupName))) {
          router.replace('/404')
          return
        }
      })()
    }
  }, [router])
}
