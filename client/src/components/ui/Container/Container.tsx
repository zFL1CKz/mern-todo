import React, {FC} from 'react'
import './Container.scss'

interface ContainerProps{
  isFullWidth?: boolean
  children: React.ReactNode | React.ReactChild
}

const Container: FC<ContainerProps> = ({isFullWidth = false, children}) => {
  return (
    <div className={`container ${isFullWidth && 'full'}`}>
      {children}
    </div>
  )
}

export default Container