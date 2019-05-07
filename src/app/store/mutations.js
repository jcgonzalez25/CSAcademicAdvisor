export const REQUEST_TASK_CREATION =`REQUEST_TASK_CREATION`;
export const CREATE_TASK = `CREATE_TASK`;
export const SET_COMPLETION =  `SET_COMPLETION`
export const SET_STUDENT_MESSAGE = `SET_STUDENT_MESSAGE`;
export const SET_STUDENT_GROUP = `SET_STUDENT_GROUP`;
export const REQUEST_AUTHENTICATE_USER = `REQUEST_AUTHENTICATE_USER`;
export const PROCESSING_AUTHENTICATE_USER =`PROCESSING_AUTHENTICATE_USER`;
export const AUTHENTICATED = `AUTHENTICATED`;
export const AUTHENTICATING = `AUTHENTICATING`;
export const NOT_AUTHENTICATED = `NOT_AUTHENTICATED`;
export const SET_STATE = `SET_STATE`;
export const SET_STUDENT_STATE = `SET_STUDENT_STATE`;
export const FORM_UPDATE = `FORM_UPDATE`;
export const REQUEST_REGISTRATION = `REQUEST_REGISTRATION`;
export const REGISTRATION_PROCESSING = `REGISTRATION_PROCESSING`;
export const REGISTRATION_FAILED = `REGISTRATION_FAILED`;
export const REGISTRATION_COMPLETE = `REGISTRATION_COMPLETE`;

export const requestTaskCreation = (groupID)=>({
    type:REQUEST_TASK_CREATION,
    groupID
});

export const createTask = (taskID,groupID,ownerID,name)=>({
    type:CREATE_TASK,
    taskID,
    name,
    groupID,
    ownerID
});
export const setStudentCompletion = (id,isComplete)=>({
    type:SET_COMPLETION,
    id,
    isComplete
});

export const setStudentMessage = (id,message)=>({
    type: SET_STUDENT_MESSAGE,
    id,
    message
});
export const setStudentGroup = (id,group)=>({
    type: SET_STUDENT_GROUP,
    id,group
});

export const requestAuthenticateUser = (username,password)=>({
    type:REQUEST_AUTHENTICATE_USER,
    password,username
})
export const processingAuthenticateUser = (status=AUTHENTICATING,session=null)=>({
    type:PROCESSING_AUTHENTICATE_USER,
    status:status,
    session:session
})

export const setState = (state={})=>({
    type:SET_STATE,
    state
})
export const setStudentState = (state={})=>({
    type:SET_STUDENT_STATE,
    state
})
export const requestFormUpdate = (changeTo)=>({
    type:FORM_UPDATE,
    changeTo
})

export const requestRegistration = (username,password,first_name,last_name)=>({
    type:REQUEST_REGISTRATION,
    username,password,first_name,last_name
})
export const processingRegistration = (status = REGISTRATION_PROCESSING)=>({
    type: REGISTRATION_PROCESSING,
    status
})