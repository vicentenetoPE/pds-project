import { AppRoutes } from './routes'

function App() {
  const backendURL = import.meta.env.VITE_BACKEND_API;
  console.log(backendURL);
  return (
    <AppRoutes/>
  )
}

export default App
