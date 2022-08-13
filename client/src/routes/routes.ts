import React from 'react'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Main from '../pages/Main'
import Profile from '../pages/Profile'

export interface IRoute {
  path: string,
  Element: React.FC
}

export enum RouteNamesEnum {
  LOGIN = '/login',
  REGISTER = '/register',
  MAIN = '/',
  PROFILE = '/profile'
}

export const publicRoutes: IRoute[] = [
  {path: RouteNamesEnum.LOGIN, Element: Login},
  {path: RouteNamesEnum.REGISTER, Element: Register}
]

export const privateRoutes: IRoute[] = [
  {path: RouteNamesEnum.MAIN, Element: Main},
  {path: RouteNamesEnum.PROFILE, Element: Profile},
]