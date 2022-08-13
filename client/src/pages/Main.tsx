import React, {FC} from 'react'
import {Link} from 'react-router-dom'

const Main: FC = () => {

  return (
    <div>
      <Link to='/profile'>
        Profile
      </Link>
    </div>
  )
}

export default Main