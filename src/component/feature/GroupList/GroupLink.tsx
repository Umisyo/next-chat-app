import Link from 'next/link'
import { GroupObject } from '~/component/feature/GroupList/types/GroupObject'

export default function GroupLink({ groupName, latestEntry }: GroupObject) {
  return (
    <li className="border w-full">
      <Link className='block py-2 pl-2' href={`/chat/${groupName}`}>
        <p className="font-bold">{groupName}</p>
        <span className="font-thin text-xs text-gray-500">
          {latestEntry?.message || 'メッセージはありません'}
        </span>
      </Link>
    </li>
  )
}
