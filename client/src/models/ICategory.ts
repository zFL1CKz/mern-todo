import {IUser} from './IUser'

export interface ICategory {
  _id: string
  name: string
  color: string
  icon: string
  user: IUser | null
}