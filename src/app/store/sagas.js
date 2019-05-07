import {take,put,select} from 'redux-saga/effects'

import uuid from 'uuid';
import axios from 'axios';
import { history } from './history'
import * as mutations from './mutations';

const url = process.env.NODE_ENV== "production"?"": "http://localhost:7777";

export function *taskCreationSaga(){
    while(true){
        const {groupID} = yield take(mutations.REQUEST_TASK_CREATION);
        const ownerID   = `U1`;
        const name      = `New Task`;
        const taskID    = uuid();
        yield put(mutations.createTask(taskID,groupID,ownerID,name));
        const { res } = yield axios.post(url + `/task/new`,{
            task:{
                id:taskID,
                group:groupID,
                owner:ownerID,
                isComplete:false,
                name:name   
            }
        
        });
    }
}


export function* studentModificationSaga(){
    while(1){
        const student = yield take([
            mutations.SET_COMPLETION,
            mutations.SET_STUDENT_MESSAGE,
            mutations.SET_STUDENT_GROUP
        ])
            let x = yield axios.post(url + `/student/update`,{
                student:{
                    id:student.id,
                    group:student.group,
                    message:student.message,
                    isComplete:student.isComplete
                }
            });
    }

}
export function* authenticateUserSaga(){
    while(1){
        let {username,password} = yield take(mutations.REQUEST_AUTHENTICATE_USER);
        try {
            const {data} = yield axios.post(url + "/authenticate",{
                username,password
            })
            if(!data){
                throw new Error();
            }
            let permissions = data.state.session.permissions;
            yield put(mutations.processingAuthenticateUser(mutations.AUTHENTICATED))
            //add student route here
            console.log(data)
            console.log(permissions)
            if(permissions == "student"){
                history.push("/studentDashboard");
                yield put(mutations.setStudentState(data.state.student))
            }else if(permissions == "teacher"){
                yield put(mutations.setState(data.state))
                history.push("/dashboard")

            }

        } catch (error) {
            console.log(error)
            yield put(mutations.processingAuthenticateUser(mutations.NOT_AUTHENTICATED))
        }
    }
}


export function* registerUserSaga(){
    while(1){
        let {username,password,first_name,last_name} = yield take(mutations.REQUEST_REGISTRATION);
        try{
            yield put(mutations.processingRegistration())
            const {data} = yield axios.post(url + "/register",{
                username,password,first_name,last_name
            });
            yield put(mutations.processingRegistration(mutations.REGISTRATION_COMPLETE))
            yield put(mutations.requestFormUpdate("login"));
        }catch(e){
            let errorInfo = e.response.data || null;
            yield put(mutations.processingRegistration(mutations.REGISTRATION_FAILED))
        }

    }
}