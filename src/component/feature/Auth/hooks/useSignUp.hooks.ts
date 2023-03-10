import { FirebaseError } from 'firebase/app'
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { toast } from 'react-toastify'
import { FormState } from '~/component/feature/Auth/types/FormState'

const auth = getAuth()

export const useSignUp = async (formState: FormState, imageUrl: string) => {
  try {
    await createUserWithEmailAndPassword(
      auth,
      formState.email,
      formState.password,
    ).then(user => updateProfile(user.user, {
      displayName: formState.userName,
      photoURL: imageUrl
    }))
  } catch (e) {
    if (e instanceof FirebaseError) {
      toast.error("アカウント作成に失敗しました")
    }
  }
}
