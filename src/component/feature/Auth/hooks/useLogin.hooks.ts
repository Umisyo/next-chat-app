import { FirebaseError } from 'firebase/app'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { toast } from 'react-toastify'
import { FormState } from '~/component/feature/Auth/types/FormState'

const auth = getAuth()

export const useLogin = async (formState: FormState) => {
  try {
    await signInWithEmailAndPassword(auth, formState.email, formState.password)
    toast.success('Successfully logged in!')
  } catch (e) {
    if (e instanceof FirebaseError) {
      toast.error(e.message)
    }
  }
}
