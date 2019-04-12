import React from 'react';
import {Provider} from 'react-redux';
import {store} from '../store';
import {ConnectedDashboard} from './Dashboard'
// Anything inside the Provider Compoenent will have access to this store 

export const Main = ()=>(
    <Provider store={store}>
        <ConnectedDashboard/>
    </Provider>
)