import React from 'react';
import {Provider} from 'react-redux';
import {store} from '../store';
import {ConnectedDashboard} from './Dashboard';
import { Router, Route } from 'react-router-dom';
import {history} from '../store/history';
import {ConnectedNavigation} from './Navigation';
import {ConnectedStudentDetail} from './StudentDetail';
import { Redirect } from 'react-router';
import {ConnectedLogin} from './Form/Login';
import {ConnectedStudentPage} from './Student';
//import {ConnectedStudent} from './Student';
// Anything inside the Provider Compoenent will have access to this store 
const RouteGuard = Component=>({match})=>{

    if(!store.getState().session.authenticated){
        return <Redirect to="/"/>
    }
    return <Component match={match}/>
}


export const Main = ()=>(
    <Router history={history}>
        <Provider store={store}>
            <div>
                <Route exact path="/" component={ConnectedLogin}/>
                <Route exact path="/dashboard" render={RouteGuard(ConnectedDashboard)}/>
                <Route exact path="/student/:id" render={RouteGuard(ConnectedStudentDetail)}/>
                <Route exact path="/studentDashboard" render={RouteGuard(ConnectedStudentPage)}/>
            </div>
        </Provider>
    </Router>
)