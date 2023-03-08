import { ChangeEvent, FormEvent, useState } from 'react'
import { useSignUp } from '~/component/feature/Auth/Auth.hooks'

export default function SignUp() {
  const [formState, setFormState] = useState({
    email: '',
    password: ''
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormState({ ...formState, [name]: value })
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    useSignUp(formState)
    setFormState({
      email: '',
      password: ''
    })
  }

  return (
    <div className='flex justify-center w-[1160px] h-screen mx-auto pt-2.5'>
      <div>
        <h2 className='text-2xl font-bold'>サインアップ</h2>
        <form className='mt-6' onSubmit={handleSubmit}>
          <input className='w-96 h-8 block' type="email" name="email" value={formState.email} onChange={handleChange} required placeholder="メールアドレス" />
          <input className='w-96 h-8 block mt-2' type="password" name="password" value={formState.password} onChange={handleChange} required placeholder="パスワード" />
          <button className='block bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 mt-10' type="submit">アカウントを作成</button>
        </form>
      </div>
    </div>
  )
}