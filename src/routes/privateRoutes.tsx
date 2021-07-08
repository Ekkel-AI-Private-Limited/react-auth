import React from 'react'
// import { useSelector } from 'react-redux';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import { DashboardPage } from '../view';
import { routes } from './routesConstants';


const PrivateRoutes = ({ component: Page, authToken, ...rest }: any) => {
    console.log('Hello')
    return (
        <Switch>
            <Route path={routes.dashboard} component={DashboardPage}/>
        </Switch>
    );
}

export default PrivateRoutes