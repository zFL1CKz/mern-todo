import React, {FC, useEffect, useState} from 'react'
import {Navigate, Route, Routes} from 'react-router-dom'
import {privateRoutes, publicRoutes, RouteNamesEnum} from '../../routes/routes'
import {useAuth} from '../../hooks/useAuth'

const AppRouter: FC = () => {
  const isAuth = !!useAuth().user
  return (
    isAuth ?
    <>
      <Routes>
        {privateRoutes.map(({path, Element}) =>
          <Route key={path} path={path} element={<Element/>}/>
        )}
        <Route path='*' element={<Navigate to={RouteNamesEnum.MAIN} replace />}/>
      </Routes>
    </>
    :
    <>
      <Routes>
        {publicRoutes.map(({path, Element}) =>
          <Route key={path} path={path} element={<Element/>}/>
        )}
        <Route path='*' element={<Navigate to={RouteNamesEnum.LOGIN} replace />}/>
      </Routes>
    </>
  )
}

export default AppRouter