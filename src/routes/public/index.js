import ForgotPassword from '../../pages/public/ForgotPassword'
import ResetPassword from '../../pages/public/ResetPassword'
import ConfirmUser from '../../pages/public/ConfirmUser'
import SignIn from '../../pages/public/SignIn'
import SignUp from '../../pages/public/SignUp'
import UnAuth from '../../layouts/UnAuth'

export { UnAuth }

export default [
    {
        path: 'forgot-password',
        component: ForgotPassword
    },
    {
        path: 'forgot-password/:id',
        component: ResetPassword
    },
    {
        path: 'confirm/:id',
        component: ConfirmUser
    },
    {
        index: true,
        component: SignIn
    },
    {
        path: 'signup',
        component: SignUp
    }
]