import React, { useEffect } from 'react'
import { BrowserRouter as Router, Redirect, Switch, Route, BrowserRouter } from 'react-router-dom'
import {DashboardPage, LoginLazyPage, SignupLazyPage, ForgotLazyPage, ResetPasswordLazyPage } from '../view'
import PrivateRoutes from './privateRoutes'
import { routes } from './routesConstants'
import { useDispatch, useSelector } from 'react-redux'
import { HttpService } from '../services'
import { refreshProfile } from '../store/action'
import { AuthRoutes } from './authentication.route'

const MainRoutes = () => {
    const auth: any = useSelector((store: any) => store.auth)
    HttpService.setToken(auth.access_token);
    const dispatch = useDispatch();
    useEffect(() => {
        if (auth.access_token) dispatch(refreshProfile());
    }, [])

    return (
        <BrowserRouter>
            <Switch>
                <Route path="/auth" component={AuthRoutes} />
                {auth.isLoggedIn ? <PrivateRoutes path={routes.dashboard} authToken={auth.access_token} component={DashboardPage} /> : <Redirect to={routes.login} /> }
                
            </Switch>
        </BrowserRouter>
    )
}

export default MainRoutes