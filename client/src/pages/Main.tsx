import React, {FC} from 'react'
import {useAppSelector} from '../hooks/redux'
import {selectCurrentUser} from '../store/reducers/auth/authSlice'

const Main: FC = () => {
  const user = useAppSelector(selectCurrentUser)

  return (
    <div>
      <h1>Welcome {user?.email}</h1>
    </div>
  )
}

export default Main