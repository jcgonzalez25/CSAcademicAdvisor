import {createStore, applyMiddleware,combineReducers} from 'redux';
import {defaultState} from '../../server/defaultState';
import {createLogger} from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
const sagaMiddleware = createSagaMiddleware();
// import * as sagas from './sagas.mock';
import * as sagas from './sagas';
import * as mutations from './mutations';

export const store = createStore(
    combineReducers({
        userInterface(userInterface = {formState:"login"},action){
            switch(action.type){
                case mutations.FORM_UPDATE:
                    return {...userInterface, formState:action.changeTo};
            }
            return userInterface;
        },
        session(userSession=[] || {},action){
            let {type,status} = action;
            userSession = userSession || action.session;
            switch(type){
                case mutations.SET_STUDENT_STATE:
                    return {...userSession,...action.state.session}
                case mutations.SET_STATE:
                    return {...userSession,id:action.state.session.id}
                case mutations.REQUEST_AUTHENTICATE_USER:
                    return {...userSession, authenticated:mutations.AUTHENTICATING};
                case mutations.PROCESSING_AUTHENTICATE_USER:
                    return {...userSession, authenticated:status};
                case mutations.REGISTRATION_PROCESSING:
                    return {...userSession,registration_status:status};
                default:
                    return userSession;
            }

        },
        student(student={},action){
            switch(action.type){
                case mutations.SET_STUDENT_STATE:
                    return {...action.state};
            }
            return student;
        },
        students(students=[],action){
            switch(action.type){
                case mutations.SET_STATE:
                    return action.state.students;
                case mutations.CREATE_TASK:
                    return [...tasks,
                        {
                            name:action.name,
                            id:action.taskID,
                            group:action.groupID,
                            owner:action.ownerID,
                            iscomplete:false,
                        }
                    ]
                case mutations.SET_COMPLETION:
                    return students.map(task=>task.id==action.id?{...student,isComplete:action.isComplete}:student);
                case mutations.SET_STUDENT_GROUP:
                    return students.map(student=>student.id==action.id?{...student,group:action.group}:student);
                case mutations.SET_STUDENT_MESSAGE:
                    return students.map(student=>student.id==action.id?{...student,message:action.message}:student);
            }
            return students;
        },
        comments(comments = [],action){
                return comments;
        },
        groups(groups = [],action){
            switch(action.type){
                case mutations.SET_STATE:
                    return action.state.groups;
            }
            return groups
        },
        users(users = []){
            return users;
        }
    })
    ,applyMiddleware(createLogger(),sagaMiddleware)
)
for(let saga in sagas){
    sagaMiddleware.run(sagas[saga]);
}