import { Header } from './components/header'
import { AppRoutes } from './routes'
import { PageBody } from './GlobalStyles'


function App() {


  return (
    <>
      <Header/>
      <PageBody>
        <AppRoutes/>
      </PageBody>
    </>
  )
}

export default App
