import React from 'react';
import { BrowserRouter,Switch,Route} from 'react-router-dom';
import PrivateRoute from './PrivateRoute'
import LogIn from './pages/LogIn'
import NotFoundPage from './pages/NotFoundPage'
import {routes} from './routes'
import AuthProvider from './auth/AuthProvider';
import PublicRoute from './PublicRoute';
import Dashboard from './pages/Dashboard';

export default function App() {
  return (
    <BrowserRouter>
        <AuthProvider>
          <Switch>
              <PublicRoute exact path={routes.login} component={LogIn} />
              <PrivateRoute extact path={routes.home} component={Dashboard}/>
              <Route path="*" component={NotFoundPage} />
          </Switch>
        </AuthProvider>
    </BrowserRouter> 
  );
}
