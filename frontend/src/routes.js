import {Homepage} from './pages/Homepage'
import {Workspace} from './pages/Workspace'
import {BoardApp} from './pages/BoardApp'
import {TaskDetails} from './pages/TaskDetails'


// Routes accesible from the main navigation (in AppHeader)
const routes = [
    {
        path:'/',
        component: Homepage,
        label: 'Home 🏠',
    },
    {
        path:'/workspace',
        component: Workspace,
        label: 'Workspace'
    },
    {
        path:'/board/:boardId',
        component: BoardApp,
        label: 'Board'
    },
    {
        path:'/board/:boardId/:listId/:taskId',
        component: TaskDetails,
        label: 'Task Details'
    }
   
]

export default routes;