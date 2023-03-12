import { FormEvent, useState } from 'react'
import { useAuthContext } from '~/component/feature/Auth/AuthProvider'
import GroupLink from '~/component/feature/GroupList/GroupLink'
import { useAddGroup } from '~/component/feature/GroupList/hooks/useAddGroup.hooks'
import { useGroupList } from '~/component/feature/GroupList/hooks/useGroupList.hooks'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare } from '@fortawesome/free-regular-svg-icons'

export default function GroupList() {
  const [newGroup, setNewGroup] = useState('')
  const user = useAuthContext()?.user

  const addGroup = useAddGroup
  const groupList = useGroupList()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await addGroup(newGroup, user).then(() => {
      setNewGroup('')
    })
  }

  return (
    <div>
      <ul>
        {groupList.map((group, index) => (
          <GroupLink
            groupName={group.groupName}
            latestEntry={group.latestEntry}
            updatedAt={group.updatedAt}
            key={index}
          />
        ))}
      </ul>
      <form className='w-full flex fixed bottom-0 left-0 right-0' onSubmit={handleSubmit}>
        <form
          className="flex w-full fixed bottom-0 left-0 right-0 bg-slate-100 border"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            className="w-full h-12 px-1 bg-slate-100"
            placeholder="なにか投稿してみましょう"
            value={newGroup}
            onChange={(e) => setNewGroup(e.target.value)}
          />
          <button className='w-14'>
            <FontAwesomeIcon icon={faPlusSquare} />
          </button>
        </form>
      </form>
    </div>
  )
}
