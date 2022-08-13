import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {IUser} from '../../models/IUser'
import {RootState} from '../store'

export interface authState {
  user: IUser | null
  accessToken: string | null
}

const initialState: authState = {
  user: null,
  accessToken: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<authState>) => {
      state.user = action.payload.user
      state.accessToken = action.payload.accessToken
    },
    logout: (state) => {
      state.user = null
      state.accessToken = null
    }
  }
})

export const {setCredentials, logout} = authSlice.actions
export default authSlice.reducer
export const selectCurrentUser = (state: RootState) => state.auth.user
