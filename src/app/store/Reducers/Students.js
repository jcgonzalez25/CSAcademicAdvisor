import * as mutations from '../mutations'; 

export function students(students=[],action){
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
}