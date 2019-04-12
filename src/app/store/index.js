import {createStore} from 'redux';
import {defaultState} from '../../server/defaultState';
import {Student} from '../../server/studentState'
export const store = createStore(
    function reducer(state = defaultState,action){
        return state;
    }
)