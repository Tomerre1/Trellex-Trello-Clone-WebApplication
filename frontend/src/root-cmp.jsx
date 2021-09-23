import React from 'react'

// const { Switch, Route } = ReactRouterDOM
import { Switch, Route } from 'react-router'

import routes from './routes'
import {AppHeader} from './cmps/AppHeader'
// import {UserDetails} from './pages/user-details'

export class RootCmp extends React.Component {

    render() {
        return (
            <div>
                <AppHeader/>
                <main>
                    <Switch>
                        {routes.map(route=> <Route key={route.path} exact component={route.component} path={route.path} /> )}
                        {/* <Route path="/user/:id" component={UserDetails} /> */}
                    </Switch>
                </main>
            </div>
        )
    }
}


