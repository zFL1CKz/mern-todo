import React, {FC} from 'react'
import './Page.scss'

interface PageProps{
  children: React.ReactNode | React.ReactChild
}

const Page: FC<PageProps> = ({children}) => {
  return (
    <div className='wrapper'>
      {children}
    </div>
  )
}

export default Page