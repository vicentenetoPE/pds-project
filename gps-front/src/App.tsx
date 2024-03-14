import { Header } from './components/header'
import { AppRoutes } from './routes'
import { PageBody } from './GlobalStyles'
import { ToastContainer, toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from 'react'

function App() {
  
  return (
    <>
    <ToastContainer/>
      <Header/>
      <PageBody>
        <AppRoutes/>
      </PageBody>
    </>
  )
}

export default App
