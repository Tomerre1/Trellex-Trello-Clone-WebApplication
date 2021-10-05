import React from 'react'
// const { Switch, Route } = ReactRouterDOM
import { Switch, Route } from 'react-router'

import routes from './routes'
import { AppHeader } from './cmps/AppHeader'
import { socketService } from './services/socket.service'
import { TaskDetails } from './pages/TaskDetails'
import { PopoverDynamicCmp } from './cmps/Popover/PopoverDynamicCmp'
// import {UserDetails} from './pages/user-details'

export class RootCmp extends React.Component {
    componentWillUnmount() {
        socketService.terminate()
    }
    render() {
        return (
            <div>
                <AppHeader />
                <main>
                    {routes.map(route => <Route key={route.path} exact={route.isExact} component={route.component} path={route.path} />)}
                </main>
                <PopoverDynamicCmp />
            </div>
        )
    }
}


