import Link from 'next/link';
import { GroupObject } from '~/component/feature/GroupList/types/GroupObject';

export default function GroupLink({ groupName, latestEntry }: GroupObject) {
  return (
    <Link href={`/chat/${groupName}`}>
      <li className='border w-full py-2 pl-2'>
        <p className='font-bold'>{groupName}</p>
        <span className='font-thin text-xs text-gray-500'>{latestEntry || 'メッセージはありません'}</span>
      </li>
    </Link>
  )
}