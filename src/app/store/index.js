import {createStore, applyMiddleware,combineReducers} from 'redux';
import {defaultState} from '../../server/defaultState';
import {createLogger} from 'redux-logger';
import createSagaMiddleware from 'redux-saga';



const sagaMiddleware = createSagaMiddleware();
import * as sagas from './sagas.mock';
import * as mutations from './mutations';

export const store = createStore(
    combineReducers({
        tasks(tasks=defaultState.tasks,action){
            switch(action.type){
                case mutations.CREATE_TASK:
                    return [...tasks,
                        {
                            name:action.taskID,
                            id:action.taskID,
                            group:action.groupID,
                            owner:action.ownerID,
                            iscomplete:false,
                        }
                    ]
                case mutations.SET_COMPLETION:
                    return tasks.map(task=>task.id==action.id?{...task,isComplete:action.isComplete}:task);
                case mutations.SET_TASK_GROUP:
                    return tasks.map(task=>task.id==action.id?{...task,group:action.group}:task);
                case mutations.SET_TASK_NAME:
                    return tasks.map(task=>task.id==action.id?{...task,name:action.name}:task);
            }
            return tasks;
        },
        comments(comments = defaultState.comments,action){
                return comments;
        },
        groups(groups = defaultState.groups){
            return groups;
        },
        users(users = defaultState.users){
            return users;
        }
    })
    ,applyMiddleware(createLogger(),sagaMiddleware)
)
for(let saga in sagas){
    sagaMiddleware.run(sagas[saga]);
}