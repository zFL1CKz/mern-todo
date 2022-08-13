import {api} from './api'
import {ICategory} from '../models/ICategory'

export const categoryApi = api.injectEndpoints({
  endpoints: build => ({
    getAllCategories: build.query<ICategory[], any>({
      query: () => ({
        url: '/category/getcategories'
      })
    })
  })
})

export const {useGetAllCategoriesQuery} = categoryApi