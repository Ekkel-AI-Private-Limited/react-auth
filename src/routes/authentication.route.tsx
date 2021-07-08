
import React, { useEffect } from 'react'
import { Redirect, Route, Switch } from 'react-router'
import {LoginLazyPage, SignupLazyPage, ForgotLazyPage, ResetPasswordLazyPage } from '../view'
import { useSelector } from 'react-redux'
import { routes } from './routesConstants'

export const AuthRoutes = () => {

    const me = useSelector((store: any) => store.auth);
    const isLoggedIn = Boolean(me.access_token);
    console.log(isLoggedIn);
    
    return (
        <Switch>
            {
                isLoggedIn && <Redirect to="/" />
            }
            <Route path={routes.login} exact component={LoginLazyPage} />
            <Route path={routes.signup} exact component={SignupLazyPage} />
            <Route path={routes.forgot_password} exact component={ForgotLazyPage} />
            <Route path={routes.reset_password} exact component={ResetPasswordLazyPage} />
        </Switch>
    )
}
