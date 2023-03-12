import Link from 'next/link'
import { GroupObject } from '~/component/feature/GroupList/types/GroupObject'

export default function GroupLink({
  groupName,
  latestEntry,
  updatedAt,
}: GroupObject) {
  return (
    <li className="border w-full">
      <Link className="block py-2 px-2" href={`/chat/${groupName}`}>
        <p className="font-bold">{groupName}</p>
        <div className="flex mt-2">
          <span className="w-64 font-thin text-xs text-gray-500 whitespace-nowrap overflow-hidden text-ellipsis">
            {latestEntry?.message || 'メッセージはありません'}
          </span>
          <span className="ml-auto font-thin text-xs text-gray-500">
            {updatedAt.toString()}
          </span>
        </div>
      </Link>
    </li>
  )
}
