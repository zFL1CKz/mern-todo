import {combineReducers, configureStore} from '@reduxjs/toolkit'
import authReducer from './reducers/auth/authSlice'
import {apiSlice} from '../service/api.service'

const rootReducer = combineReducers({
  auth: authReducer,
  [apiSlice.reducerPath]: apiSlice.reducer
})

export const setupStore = () => {
  return  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
