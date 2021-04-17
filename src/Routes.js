import React from 'react'
import { BrowserRouter, Switch, Route} from 'react-router-dom'
import App from './App'
import Signup from './auth/Signup'
import Signin from './auth/Signin'
import Private from './core/Private'
import Admin from './core/Admin'
import PrivateRoute from './auth/PrivateRoute'
import AdminRoute from './auth/AdminRoute'
import PrivateHome from './core/PrivateHome'

const Routes = () => {
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={App} />
                <Route path="/signup" exact component={Signup} />
                <Route path="/signin" exact component={Signin} />
                <PrivateRoute path="/private" exact component={Private} />
                <PrivateRoute path='/home' exact component={PrivateHome} />
                <AdminRoute path="/admin" exact component={Admin} />            
            </Switch>
        </BrowserRouter>
    )
}

export default Routes