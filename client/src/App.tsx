import React, {FC} from 'react'
import AppRouter from './components/logic/AppRouter'
import './assets/styles/app.scss'
import Page from './components/ui/Page/Page'
import Navbar from './components/ui/Navbar/Navbar'

const App: FC = () => {
  return (
    <Page>
      <AppRouter/>
      <Navbar/>
    </Page>
  )
}

export default App