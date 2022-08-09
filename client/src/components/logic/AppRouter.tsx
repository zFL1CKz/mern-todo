import React, {FC} from 'react'
import {Navigate, Route, Routes} from 'react-router-dom'
import {privateRoutes, publicRoutes, RouteNamesEnum} from '../../routes/routes'

const AppRouter: FC = () => {
  const isAuth = true
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