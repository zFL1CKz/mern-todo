import {combineReducers, configureStore} from '@reduxjs/toolkit'
import authReducer from '../store/slices/authSlice'
import {api} from '../services/api'

const rootReducer = combineReducers({
  auth: authReducer,
  [api.reducerPath]: api.reducer
})

export const setupStore = () => {
  return  configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware()
      .concat(api.middleware)
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
