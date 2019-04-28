import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { connectDB } from './connect-db';
let port = 7777;
let app = express();
app.listen(port,console.log("Server Listening on Port",port))
app.use(
    cors(),
    bodyParser.urlencoded({extended:true}),
    bodyParser.json()
);

export const addNewTask = async task=>{
    let db = await connectDB();
    let collection = db.collection('tasks');
    await collection.insertOne(task);

}
export const updateTask = async task=>{
    let {id,group,isComplete,name} = task;
    let db = await connectDB();
    let collection = db.collection('tasks');
    if(group){
        await collection.updateOne({id},{$set:{group}})
    }
    if(isComplete !== undefined){
        await collection.updateOne({id},{$set:{isComplete}})
    }
    if(name){
        await collection.updateOne({id},{$set:{name}})
    }
}

app.post('/task/new',async (req,res)=>{
    let task = req.body.task;
    await addNewTask(task);
    res.status(200).send();
});

app.post('/task/update',async (req,res)=>{
    let task = req.taskID;
    await updateTask
})

