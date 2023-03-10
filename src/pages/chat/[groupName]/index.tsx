import { AuthGuard } from '~/component/feature/Auth/AuthGuard';
import Chat from '~/component/feature/Chat/Chat';

export default function Page() {
  return (
    <AuthGuard>
      <Chat />
    </AuthGuard>
  )
}
