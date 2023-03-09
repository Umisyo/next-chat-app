import { get, getDatabase, ref } from 'firebase/database';

export const useIsRedirect = async (key: string) => {
  const db = getDatabase()

  const dbRef = ref(db, "groups/" + key);
  return await get(dbRef).then((snapshot) => {
    return snapshot.val() === null;
  })
}

