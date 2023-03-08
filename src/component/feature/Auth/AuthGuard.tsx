import { useRouter } from 'next/router'
import type { ReactNode } from 'react'
import { useAuthContext } from '~/component/feature/Auth/AuthProvider'

type Props = {
  children: ReactNode
}

export const AuthGuard = ({ children }: Props) => {
  const { user } = useAuthContext()
  const { push } = useRouter()

  if (typeof user === 'undefined') {
    return <p>読み込み中...</p>
  }

  if (user === null) {
    push('/signin')
    return null
  }

  return <>{children}</>
}