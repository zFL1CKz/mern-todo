import {BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError} from '@reduxjs/toolkit/query/react'
import {RootState} from '../store/store'
import {useAppDispatch} from '../hooks/redux'
import {logout, setCredentials} from '../store/reducers/auth/authSlice'
import {IUser} from '../models/IUser'

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:5000/api',
  mode: 'no-cors',
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token
    if(token){
      headers.set('authorization', `Bearer ${token}`)
    }
    return headers
  }
})

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)
  if(result?.error?.status === 401) {
    const refreshResult = await baseQuery('/auth/refresh', api, extraOptions)
    if(refreshResult?.data){
      const user = (api.getState() as RootState).auth.user
      api.dispatch(setCredentials({...refreshResult, user }))
      result = await baseQuery(args, api, extraOptions)
    }
  } else {
    api.dispatch(logout())
  }
  return result
}

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (build) => ({

  })
})