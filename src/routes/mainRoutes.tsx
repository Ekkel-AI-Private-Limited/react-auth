import React, { useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, BrowserRouter } from 'react-router-dom'
import {DashboardPage, LoginPage} from '../view'
import PrivateRoutes from './privateRoutes'
import { routes } from './routesConstants'
// import { useSelector } from 'react-redux'
// import { HttpService } from '../services'

const MainRoutes = () => {
    // const access_token: any = useSelector(selectToken)
    // const token: any = useSelector(selectHeaderToken);

    // HttpService.setToken(token);
    return (
            <BrowserRouter>
                <Switch>
                    <Route path={routes.login} exact component={LoginPage} />
                        <PrivateRoutes path={routes.dashboard} authToken={"access_token"} component={DashboardPage} />
                </Switch>
            </BrowserRouter>
    )
}

export default MainRoutes