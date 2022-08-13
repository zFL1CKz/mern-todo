import {BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError} from '@reduxjs/toolkit/dist/query/react'
import {RootState} from '../store/store'
import {authState, logout, setCredentials} from '../store/slices/authSlice'

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:5000/api',
  credentials: 'include',
  prepareHeaders: (headers, {getState}) => {
    const token = (getState() as RootState).auth.accessToken
    if(token) {
      headers.set('authorization', `Bearer ${token}`)
    }
    return headers
  }
})

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)
  if(result?.error?.status === 401) {
    const refreshResult = await baseQuery('/auth/refresh', api, extraOptions)
    console.log(refreshResult)
    if(refreshResult.data) {
      api.dispatch(setCredentials(refreshResult.data as authState))
      result = await baseQuery(args, api, extraOptions)
    } else {
      api.dispatch(logout())
    }
  }
  return result
}

export const api = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: builder => ({})
})