import { FirebaseError } from 'firebase/app'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { toast } from 'react-toastify'
import { FormState } from '~/component/feature/Auth/types/FormState'

const auth = getAuth()

export const useSignUp = async (formState: FormState) => {
  try {
    await createUserWithEmailAndPassword(
      auth,
      formState.email,
      formState.password,
    )
    toast.success('Successfully signed up!')
  } catch (e) {
    if (e instanceof FirebaseError) {
      toast.error(e.message)
    }
  }
}
