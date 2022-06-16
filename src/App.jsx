import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ProjectProvider } from './context/ProjectsContext'
import { AuthProvider } from './context/AuthContext'

import NewCollaborator from './pages/private/NewCollaborator'
import ForgotPassword from './pages/public/ForgotPassword'
import ResetPassword from './pages/public/ResetPassword'
import EditProject from './pages/private/EditProject'
import ConfirmUser from './pages/public/ConfirmUser'
import NewProject from './pages/private/NewProject'
import SignupUser from './pages/public/SignupUser'
import Projects from './pages/private/Projects'
import Project from './pages/private/Project'
import Login from './pages/public/Login'
import Unauth from './layouts/Unauth'
import Auth from './layouts/Auth'

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ProjectProvider>
          <Routes>
            {/* Public routes */}
            <Route path='/' element={<Unauth />}>
              <Route index element={<Login />} />
              <Route path='signup' element={<SignupUser />} />
              <Route path='forgot-password' element={<ForgotPassword />} />
              <Route path='forgot-password/:id' element={<ResetPassword />} />
              <Route path='confirm/:id' element={<ConfirmUser />} />
            </Route>

            {/* Private routes */}
            <Route path='/projects' element={<Auth />}>
              <Route index element={<Projects />} />
              <Route path='new-project' element={<NewProject />} />
              <Route path='new-collaborator/:id' element={<NewCollaborator />} />
              <Route path=':id' element={<Project />} />
              <Route path='edit/:id' element={<EditProject />} />
            </Route>
          </Routes>
        </ProjectProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
