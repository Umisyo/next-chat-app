import { FirebaseError } from 'firebase/app'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { toast } from 'react-toastify';

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
    toast.success('Successfully signed up!')
  } catch (e) {
    if (e instanceof FirebaseError) {
      toast.error(e.message)
    }
  }
}