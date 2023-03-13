import { useRouter } from 'next/router'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useAuthContext } from '~/component/feature/Auth/AuthProvider'
import { useLogin } from '~/component/feature/Auth/hooks/useLogin.hooks'
import Button from '~/component/ui/Button'

export default function Login() {
  const [formState, setFormState] = useState({
    email: '',
    password: '',
  })

  const login = useLogin
  const user = useAuthContext().user
  const router = useRouter()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    login(formState)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormState({ ...formState, [name]: value })
  }

  useEffect(() => {
    if (user) {
      router.replace('/')
    }
  }, [user])

  return (
    <div className="flex justify-center h-screen mx-auto pt-2.5">
      <div>
        <h2 className="text-2xl font-bold">ログイン</h2>
        <form className="mt-6" onSubmit={handleSubmit}>
          <label>
            <p>メールアドレス</p>
            <input
              className="w-96 h-8 block"
              type="email"
              name="email"
              value={formState.email}
              onChange={handleChange}
              required
              placeholder="メールアドレス"
            />
          </label>
          <label>
            <p className='mt-2'>パスワード</p>
            <input
              className="w-96 h-8 block"
              type="password"
              name="password"
              value={formState.password}
              onChange={handleChange}
              required
              placeholder="パスワード"
            />
          </label>
          <Button isBlock type="submit" someStyles="px-4 py-2 mt-10">
            ログイン
          </Button>
        </form>
      </div>
    </div>
  )
}
