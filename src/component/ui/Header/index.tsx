import Link from 'next/link'
import { useRouter } from 'next/router'
import { useAuthContext } from '~/component/feature/Auth/AuthProvider'
import { useLogout } from '~/hooks/useLogout.hooks'

const logout = useLogout

export default function Header() {
  const router = useRouter()
  const handleLogout = async () => {
    await logout()
  }
  const user = useAuthContext().user
  return (
    <header className="w-full h-14 bg-cyan-700 p-3 sticky top-0 z-50">
      <nav className="flex w-full justify-between items-center">
        <h1 className="text-white">
          <Link href="/">
            NextChat
          </Link>
        </h1>
        {user ? (
          <button
            className="w-28 text-white border border-white border-dotted p-1 hover:opacity-75"
            onClick={handleLogout}
            type="button"
          >
            ログアウト
          </button>
        ) : (
          <button
            className="w-28 text-white border border-white border-dotted p-1 hover:opacity-75"
            onClick={(e) => router.push('/signup')}
          >
            サインアップ
          </button>
        )}
      </nav>
    </header>
  )
}
