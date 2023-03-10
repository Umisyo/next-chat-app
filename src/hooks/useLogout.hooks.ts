import { FirebaseError } from 'firebase/app'
import { getAuth, signOut } from 'firebase/auth'

export const useLogout = async () => {
  try {
    const auth = getAuth()
    await signOut(auth)
  } catch (e) {
    if (e instanceof FirebaseError) {
      console.log(e)
    }
  }
}