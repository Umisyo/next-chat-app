import { ChangeEvent, FormEvent, useState } from 'react'
import { useLogin } from '~/component/feature/Auth/Auth.hooks';

export default function Login() {
  const [formState, setFormState] = useState({
    email: '',
    password: ''
  })

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    useLogin(formState);
    setFormState({
      email: '',
      password: ''
    })
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormState({ ...formState, [name]: value })
  }

  return (
    <div className='flex justify-center w-[1160px] h-screen mx-auto pt-2.5'>
      <div>
        <h2 className='text-2xl font-bold'>ログイン</h2>
        <form className='mt-6' onSubmit={handleSubmit}>
          <input className='w-96 h-8 block' type="email" name="email" value={formState.email} onChange={handleChange} required placeholder="メールアドレス" />
          <input className='w-96 h-8 block mt-2' type="password" name="password" value={formState.password} onChange={handleChange} required placeholder="パスワード" />
          <button className='block bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 mt-10' type="submit">ログイン</button>
        </form>
      </div>
    </div>
  )
}