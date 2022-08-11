import {IUser} from './IUser'

export interface IAuthRequest {
  email: string
  password: string
}

export interface IAuthResponse {
  accessToken: string
  user: IUser
}