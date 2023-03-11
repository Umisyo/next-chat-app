import Image from 'next/image'
import { MessageObject } from '~/component/feature/Chat/types/MessageObject'

interface MessageItemProps {
  message: MessageObject
}

export default function MessageItem({ message }: MessageItemProps) {
  return (
    <div className="flex border px-1 py-2">
      <div>
        <Image
          className="rounded-full"
          src={message.sendUserAvatar}
          alt={message.sendUserName}
          width={50}
          height={50}
        />
      </div>
      <div className="w-full ml-2">
        <p className="font-bold">{message.sendUserName}</p>
        <p>{message.message}</p>
      </div>
    </div>
  )
}
