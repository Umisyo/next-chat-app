import { AuthGuard } from '~/component/feature/Auth/AuthGuard';

export default function Home() {
  return (
    <AuthGuard>
      <div>Home</div>
    </AuthGuard>
  )
}
