import * as mutations from '../mutations'; 

export function session(userSession=[] || {},action){
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

}