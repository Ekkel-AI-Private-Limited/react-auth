import React from 'react'
// import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { routes } from './routesConstants';

const PrivateRoutes = ({ component: Page, authToken, ...rest }: any) => {
    // const token: any = useSelector(selectHeaderToken);
   
    // HttpService.setToken(token);
    console.log('inside');
    return (
        <Route {...rest} render={(props:any) => {
            return (
                <>
                    {authToken ? <Page {...props} /> : <Redirect to={routes.login} />}
                </>
            )
        }} />
    );
}

export default PrivateRoutes