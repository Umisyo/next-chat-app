import { ChangeEvent, FormEvent, useState } from 'react'
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
} from 'firebase/auth'

import { FirebaseError } from 'firebase/app'

export default function SignUp() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      const auth = getAuth()
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      )
      await sendEmailVerification(userCredential.user)
      setFormData({
        email: '',
        password: ''
      })
    } catch (e) {
      if (e instanceof FirebaseError) {
        console.log(e)
      }
    }
  }

  return (
    <div className='flex justify-center w-[1160px] h-screen mx-auto pt-2.5'>
      <div>
        <h2 className='text-2xl font-bold'>サインアップ</h2>
        <form className='mt-6' onSubmit={handleSubmit}>
          <input className='w-96 h-8 block' type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="メールアドレス" />
          <input className='w-96 h-8 block mt-2' type="password" name="password" value={formData.password} onChange={handleChange} required placeholder="パスワード" />
          <button className='block bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 mt-10' type="submit">アカウントを作成</button>
        </form>
      </div>
    </div >
  )
}