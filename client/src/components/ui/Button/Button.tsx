import React, {FC} from 'react'
import './Button.scss'

export enum ButtonVariantEnum {
  primary = 'primary',
  secondary = 'secondary',
}

interface ButtonProps {
  text: string
  variant: ButtonVariantEnum
  onClick: () => void
}

const Button: FC<ButtonProps> = ({text, variant, onClick}) => {
  return (
    <button className={`button ${variant === ButtonVariantEnum.primary ? 'primary' : 'secondary'}`}
      onClick={onClick}
    >
      {text}
    </button>
  )
}

export default Button