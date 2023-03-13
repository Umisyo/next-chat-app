import { FormEvent, useState } from 'react'
import { useAuthContext } from '~/component/feature/Auth/AuthProvider'
import GroupLink from '~/component/feature/GroupList/GroupLink'
import { useAddGroup } from '~/component/feature/GroupList/hooks/useAddGroup.hooks'
import { useGroupList } from '~/component/feature/GroupList/hooks/useGroupList.hooks'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare } from '@fortawesome/free-regular-svg-icons'

export default function GroupList() {
  const [group, setGroup] = useState('')
  const user = useAuthContext()?.user

  const addGroup = useAddGroup
  const groupList = useGroupList()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const newGroup = group
    setGroup('')
    await addGroup(newGroup, user)
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
      <form
        className="flex w-full fixed bottom-0 left-0 right-0 bg-slate-100 border"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          className="w-full h-12 px-1 bg-slate-100"
          name="新しいグループ"
          placeholder="グループを作成"
          value={group}
          onChange={(e) => setGroup(e.target.value)}
        />
        <button name="send" type="submit" className="w-14">
          <FontAwesomeIcon icon={faPlusSquare} />
        </button>
      </form>
    </div>
  )
}
