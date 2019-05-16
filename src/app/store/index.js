import {createStore, applyMiddleware,combineReducers} from 'redux';
import {defaultState} from '../../server/defaultState';
import {createLogger} from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
const sagaMiddleware = createSagaMiddleware();
// import * as sagas from './sagas.mock';
import * as sagas from './sagas';
import * as mutations from './mutations';
import {userInterface} from './Reducers/UserInterface'
import {comments} from './Reducers/Comments'
import {students} from './Reducers/Students'
import {student} from './Reducers/Student'
import {users} from './Reducers/Users'
import {groups} from './Reducers/Groups'
import {session} from './Reducers/Session'



export const store = createStore(
    combineReducers({
        userInterface,
        session,
        student,
        students,
        comments,
        groups,
        users
    })
    ,applyMiddleware(createLogger(),sagaMiddleware)
)
for(let saga in sagas){
    sagaMiddleware.run(sagas[saga]);
}