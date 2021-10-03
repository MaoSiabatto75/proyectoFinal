import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import useAuth from './auth/useAuth'
import {routes} from './routes'

export default function PrivateRoute({component:Component,...rest}) {
    const auth =useAuth()
    // const user=null
    // const user = {id:1,username:"luis50"}
    return (
            <Route {...rest}>{auth.user?<Component />:<Redirect to={routes.login} />}</Route>
    )
}
