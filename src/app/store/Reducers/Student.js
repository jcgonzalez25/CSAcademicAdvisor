import * as mutations from '../mutations'; 

export function student(student={},action){
    switch(action.type){
        case mutations.SET_STUDENT_STATE:
            return {...action.state};
    }
    return student;
}