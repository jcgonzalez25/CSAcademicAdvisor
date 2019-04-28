import {addNewTask} from './server';
import {updateTask} from './server';
async function test(){
    await addNewTask({
        name:"OTHER",
        id:"123",
    })
    await updateTask({id:"T3",name:"Changed Name"});
}

test();