import { AuthGuard } from '~/component/feature/Auth/AuthGuard';
import GroupList from '~/component/feature/GroupList';

export default function Home() {
  return (
    <AuthGuard>
      <GroupList />
    </AuthGuard>
  )
}
