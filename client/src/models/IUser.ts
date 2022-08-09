export interface IUser{
  email: string
  id: string
  isActivated: boolean
}

export interface IUserResponse {
  user: IUser
  accessToken: string
}

export interface IUserLoginRequest {
  email: string
  password: string
}