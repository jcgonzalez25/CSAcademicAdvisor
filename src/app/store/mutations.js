export const REQUEST_TASK_CREATION =`REQUEST_TASK_CREATION`;
export const CREATE_TASK = `CREATE_TASK`;
export const SET_COMPLETION =  `SET_COMPLETION`
export const SET_TASK_NAME = `SET_TASK_NAME`;
export const SET_TASK_GROUP = `SET_TASK_GROUP`;
export const requestTaskCreation = (groupID)=>({
    type:REQUEST_TASK_CREATION,
    groupID
});

export const createTask = (taskID,groupID,ownerID)=>({
    type:CREATE_TASK,
    taskID,
    groupID,
    ownerID
});
export const setTaskCompletion = (id,isComplete)=>({
    type:SET_COMPLETION,
    id,
    isComplete

})

export const setTaskName = (id,name)=>({
    type: SET_TASK_NAME,
    id,
    name
})
export const setTaskGroup = (id,group)=>({
    type: SET_TASK_GROUP,
    id,group
})