import NewCollaborator from '../../pages/private/NewCollaborator'
import EditProject from '../../pages/private/EditProject'
import NewProject from '../../pages/private/NewProject'
import Projects from '../../pages/private/Projects'
import Project from '../../pages/private/Project'
import Auth from '../../layouts/Auth'

export { Auth }

export default [
    {
        index: true,
        component: Projects
    },
    {
        path: 'new-project',
        component: NewProject
    },
    {
        path: 'edit/:id',
        component: EditProject
    },
    {
        path: 'new-collaborator/:id',
        component: NewCollaborator
    },
    {
        path: ':id',
        component: Project
    }
]