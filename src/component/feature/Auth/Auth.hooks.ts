import { FirebaseError } from 'firebase/app'
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import { toast } from 'react-toastify'

export interface FormState {
  email: string
  password: string
}

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
