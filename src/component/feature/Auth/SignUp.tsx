import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useSignUp } from '~/component/feature/Auth/hooks/useSignUp.hooks'
import { useUploadImg } from '~/component/feature/Auth/hooks/useUploadImg.hooks'
import { FormState } from '~/component/feature/Auth/types/FormState'
import Image from 'next/image'
import Button from '~/component/ui/Button'
import { useAuthContext } from '~/component/feature/Auth/AuthProvider'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'

export default function SignUp() {
  const [formState, setFormState] = useState<FormState>({
    userName: '',
    email: '',
    password: '',
  })
  const [image, setImage] = useState<File | undefined>()
  const [createObjectURL, setCreateObjectURL] = useState<string>()
  const signup = useSignUp
  const uploadImg = useUploadImg
  const router = useRouter()
  const user = useAuthContext().user

  const uploadToClient = (e: FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement
    if (target.files && target.files[0]) {
      const file = target.files[0]

      setImage(file)
      setCreateObjectURL(URL.createObjectURL(file))
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormState({ ...formState, [name]: value })
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (Object.values(formState).some((value) => value === '') || !image) {
      toast.error('入力されてない項目があります')
    }
    await uploadImg(image).then((res) => {
      if (res) {
        signup(formState, res)
      }
    })
    setFormState({
      userName: '',
      email: '',
      password: '',
    })
  }

  useEffect(() => {
    if (user) {
      router.replace('/')
    }
  }, [user])

  return (
    <div className="flex justify-center h-screen mx-auto pt-2.5">
      <div className=" w-[960px]">
        <h2 className="text-2xl font-bold">サインアップ</h2>
        <form className="mt-6" onSubmit={handleSubmit}>
          {createObjectURL && (
            <Image
              className="flex justify-center m-auto items-center w-[512px] h-auto"
              src={createObjectURL}
              alt={'プロフィール画像'}
            />
          )}
          <label className="bg-primary-900 text-white-900 flex justify-center items-center px-4 py-2 rounded mb-6 w-full">
            <input
              className="hidden"
              type="file"
              accept="image/*"
              name="profileImage"
              required
              onChange={uploadToClient}
            />
            <svg
              aria-label="画像をアップロード"
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 hover:cursor-pointer hover:bg-gray-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </label>
          <input
            className="w-full h-8 block border"
            type="text"
            name="userName"
            value={formState.userName}
            onChange={handleChange}
            required
            placeholder="ユーザー名"
          />
          <input
            className="w-full h-8 block border mt-2"
            type="email"
            name="email"
            value={formState.email}
            onChange={handleChange}
            required
            placeholder="メールアドレス"
          />
          <input
            className="w-full h-8 block border mt-2"
            type="password"
            name="password"
            value={formState.password}
            onChange={handleChange}
            required
            placeholder="パスワード"
          />
          <Button isBlock type="submit" someStyles="px-4 py-2 mt-10">
            ログイン
          </Button>
        </form>
      </div>
    </div>
  )
}
