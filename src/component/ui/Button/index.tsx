import { ReactNode } from 'react'

interface ButtonProps {
  children?: ReactNode
  type?: 'submit' | 'button' | 'reset' | undefined
  isBlock?: boolean
  color?: string
  hoverColor?: string
  textColor?: string
  someStyles?: string
}

export default function Button({
  children,
  type,
  isBlock = false,
  color,
  hoverColor,
  textColor,
  someStyles,
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`${isBlock ? 'block' : ''} ${color ? color : 'bg-gray-700'} ${
        hoverColor ? hoverColor : 'hover:bg-gray-600'
      } ${textColor ? textColor : 'text-white'} ${someStyles}`}
    >
      {children}
    </button>
  )
}
