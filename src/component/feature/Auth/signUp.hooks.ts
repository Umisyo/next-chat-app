import { FirebaseError } from 'firebase/app'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'

export interface FormState {
  email: string;
  password: string;
}

export const useSignUp = async (formState: FormState) => {
  try {
    const auth = getAuth()
    await createUserWithEmailAndPassword(
      auth,
      formState.email,
      formState.password
    )
  } catch (e) {
    if (e instanceof FirebaseError) {
      console.log(e)
    }
  }
}