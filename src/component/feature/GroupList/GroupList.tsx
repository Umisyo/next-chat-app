import { FormEvent, useEffect, useState } from 'react';
import Button from '~/component/ui/Button';
import { useAuthContext } from '~/component/feature/Auth/AuthProvider';
import { useAddGroup, useGroupList } from '~/component/feature/GroupList/GroupList.hooks';
import GroupLink from '~/component/feature/GroupList/GroupLink';

export default function GroupList() {
  const [newGroup, setNewGroup] = useState('');
  const user = useAuthContext()?.user

  const addGroup = useAddGroup
  const groupList = useGroupList()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await addGroup(newGroup, user).then(
      () => {
        setNewGroup('')
      }
    )
  }

  return (
    <div>
      <ul>
        {groupList.map((group, index) => (
          <GroupLink groupName={group.groupName} latestEntry={group.latestEntry} updatedAt={group.updatedAt} key={index} />
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="グループ名" value={newGroup} onChange={e => setNewGroup(e.target.value)} />
        <Button type='submit' someStyles='w-6 h-auto'>+</Button>
      </form>
    </div>
  )
}