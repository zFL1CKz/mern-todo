import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/dist/query/react'
import {RootState} from '../store/store'
import {IAuthRequest, IAuthResponse} from '../models/IAuth'

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api',
    prepareHeaders: (headers, {getState}) => {
      const token = (getState() as RootState).auth.accessToken
      if(token) {
        headers.set('authorization', `Bearer ${token}`)
      }
      return headers
    }
  }),
  endpoints: build => ({
    login: build.mutation<IAuthResponse, IAuthRequest>({
      query: (credentials) => ({
        url: 'auth/login',
        method: 'POST',
        body: credentials
      })
    })
  })
})

export const {useLoginMutation} = api