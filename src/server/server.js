import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { connectDB } from './connect-db';
import { authenticationRoute } from './authenticate';
import md5 from 'md5';
import './initialize-db';
import uuid from 'uuid';
import path from 'path'

let port = process.env.PORT || 7777;
let app = express();
app.listen(port,console.log("Server Listening on Port",port))
app.use(
    cors(),
    bodyParser.urlencoded({extended:true}),
    bodyParser.json(),
);

authenticationRoute(app);

if(process.env.NODE_ENV == "production"){
    app.use(express.static(path.resolve(__dirname,`../../dist`)));
    app.get('/*',(req,res)=>{
        res.sendFile(path.resolve('index.html'));
    })
}


export const addNewTask = async task=>{
    let db = await connectDB();
    let collection = db.collection('tasks');
    await collection.insertOne(task);

}
export const updateStudent = async (student,res)=>{
    let {id,group,isComplete,message} = student;
    let db = await connectDB();
    let collection = db.collection('students');
    if(group){
        await collection.updateOne({id},{$set:{group}})
    }
    if(isComplete !== undefined){
        await collection.updateOne({id},{$set:{isComplete}})
    }
    if(message){
        await collection.updateOne({id},{$set:{message}})
    }
}

app.post('/task/new',async (req,res)=>{
    let task = req.body.task;
    await addNewTask(task);
    res.status(200).send();
});

app.post('/student/update',async (req,res)=>{
    let student = req.body.student;
    try{
        await updateStudent(student,res);
        res.status(200).send()
    }catch(e){
        console.log(e)
    }


})


async function addStudent(fname,lname,username,password){
    let db = await connectDB();
    let users  = await db.collection('students');
    let defaultProps = {
        group:"G1",
        owner:"U1",
        message:"no messages",
        id:uuid()
    }
    users.insertOne({...defaultProps,fname,lname,username,passwordHash:password})
}
//for student registration
app.post('/register',async (req,res)=>{
    let {first_name,last_name,username,password} = req.body;
    let db = await connectDB();
    let collection = await db.collection('students');
    let student   = await collection.findOne({username:username});
    if(student){
       return res.status(500).send("Username Not Available");
    }
    await addStudent(first_name,last_name,username,md5(password));
    res.status(200).send("registered");
});