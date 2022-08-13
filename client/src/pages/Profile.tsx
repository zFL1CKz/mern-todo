import React, {FC} from 'react'
import {useGetAllCategoriesQuery} from '../services/categoryApi'

const Profile: FC = () => {
  const {data: categories} = useGetAllCategoriesQuery('')
  categories?.map(item => console.log(item.icon))

  return (
    <div>
      {categories?.map(category =>
        <div key={category._id}>
          <img src={category.icon} height='24' width='24' alt=''/>
        </div>
      )}
    </div>
  )
}

export default Profile