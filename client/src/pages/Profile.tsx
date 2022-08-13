import React, {FC} from 'react'
import {useGetAllCategoriesQuery} from '../services/categoryApi'
import {API_URL} from '../config'

const Profile: FC = () => {
  const {data: categories} = useGetAllCategoriesQuery('')
  console.log(categories)

  return (
    <div>
      {categories?.map(category =>
        <div key={category._id}>
          <img src={`${API_URL}/category-icon/${category.icon}`} height='24' width='24' alt=''/>

        </div>
      )}
    </div>
  )
}

export default Profile