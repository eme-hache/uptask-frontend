import { BrowserRouter } from 'react-router-dom'

import { ProjectProvider } from './context/ProjectsContext'
import { AuthProvider } from './context/AuthContext'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Routes from './routes'

const App = () => {
  return (
    <BrowserRouter>
      <ToastContainer />

      <AuthProvider>
        <ProjectProvider>
          <Routes />
        </ProjectProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
