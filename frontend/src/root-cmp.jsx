import React from 'react'
import { Route } from 'react-router'
import routes from './routes'
import { AppHeader } from './cmps/AppHeader'
import { socketService } from './services/socket.service'
import { PopoverDynamicCmp } from './cmps/Popover/PopoverDynamicCmp'

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


