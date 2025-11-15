import classnames from "classnames"
import { MouseEventHandler, ReactNode } from "react"
import styles from "./Button.module.scss"

type ButtonProps = {
  title: string
  icon?: ReactNode
  outline?: boolean
  disabled?: boolean
  onClick: MouseEventHandler<HTMLButtonElement>
}

export const Button = ({ title, icon, outline, disabled, onClick }: ButtonProps) => {
  return (
    <button 
      onClick={onClick} 
      className={classnames(
        outline && styles.outline, 
        styles.button,
        disabled && styles.disabled
      )} 
      disabled={disabled}
    >
      {icon && <span className={styles.icon}>{icon}</span>}
      {title}
    </button>
  )
}
