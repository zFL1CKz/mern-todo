import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {IUser} from '../../../models/IUser'
import {RootState} from '../../store'

interface authState {
  user?: IUser | null
  token?: string | null
}

const initialState: authState = {
  user: null,
  token: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials(state, action: PayloadAction<authState>) {
      const {user, token} = action.payload
      state.user = user
      state.token = token
    },
    logout(state) {
      state.user = null
      state.token = null
    }
  }
})

export const {setCredentials, logout} = authSlice.actions

export default authSlice.reducer

export const selectCurrentUser = (state: RootState) => state.auth.user
export const selectCurrentToken = (state: RootState) => state.auth.token

