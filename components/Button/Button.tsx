import Image from 'next/image'

interface IProps {
  title: string
  leftIcon?: string | null
  rightIcon?: string | null
  handleClick?: React.MouseEventHandler
  submitting?: boolean
  type?: 'button' | 'submit'
  bgColor?: string
  textColor?: string
}

const Button = (props: IProps) => {
  const {
    title,
    leftIcon,
    rightIcon,
    submitting = false,
    type = 'button',
    bgColor,
    textColor,
    handleClick,
  } = props

  return (
    <button
      type={type}
      disabled={submitting}
      className={`flexCenter gap-3 px-4 py-3 
        ${textColor ? textColor : 'text-white'} 
        ${
          submitting ? 'bg-black/50' : bgColor ? bgColor : 'bg-primary-purple'
        } rounded-xl text-sm font-medium max-md:w-full`}
      onClick={handleClick}
    >
      {leftIcon && (
        <Image src={leftIcon} width={14} height={14} alt="left icon" />
      )}

      {title}

      {rightIcon && (
        <Image src={rightIcon} width={14} height={14} alt="right icon" />
      )}
    </button>
  )
}

export default Button
