import { GroupObject } from '~/component/feature/GroupList/GroupList';

export default function GroupLink({ groupName, latestEntry }: GroupObject) {
  return (
    <li className='border w-full py-2 pl-2'>
      <p className='font-bold'>{groupName}</p>
      <span className='font-thin text-xs text-gray-500'>{latestEntry || 'メッセージはありません'}</span>
    </li>
  )
}