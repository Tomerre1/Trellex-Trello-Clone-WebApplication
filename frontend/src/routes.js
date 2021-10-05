import { Homepage } from './pages/Homepage'
import { Workspace } from './pages/Workspace'
import { BoardApp } from './pages/BoardApp'
import { TaskDetails } from './pages/TaskDetails'
import { LoginSignup } from './pages/LoginSignup'
import { Dashboard } from './cmps/Dashboard'


const routes = [
    {
        path: '/workspace',
        component: Workspace,
        label: 'Workspace',
        isExact: true
    },
    {
        path: '/board/:boardId',
        component: BoardApp,
        label: 'Board'
    },
    {
        path: '/board/:boardId/dashboard',
        component: Dashboard,
        label: 'Board',
        isExact: true
    },
    {
        path: '/board/:boardId/:listId/:taskId',
        component: TaskDetails,
        label: 'Task Details'
    },
    {
        path: '/board/',
        component: BoardApp,
        label: 'Board',
        isExact: true
    },
    {
        path: '/login',
        component: LoginSignup,
        isExact: true
    },
    {
        path: '/',
        component: Homepage,
        label: 'Home 🏠',
        isExact: true

    },

]

export default routes;