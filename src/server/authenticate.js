import uuid from 'uuid';
import md5 from 'md5';
import { connectDB } from './connect-db';
const authenticationToken = []
async function assembleStudentState(user){
    let db = await connectDB();
    let username = user.username;
    let student = await db.collection('students').findOne({username});
    return {
        student,
        session:{
            authenticated:`AUTHENTICATED`,
            permissions:`student`
        }
    }
}


async function assembleTeacherState(user){
    let db = await connectDB();
    let students = await db.collection('students').find({owner:user.id}).toArray();
    let groups = await db.collection('groups').find({owner:user.id}).toArray();
    return {
        groups,students,
        session:{
            authenticated:`AUTHENTICATED`,
            id:user.id,
            permissions:`teacher`
        }
    }
}
export const authenticationRoute = app => {
    app.post('/authenticate',async (req,res)=>{
        let {username,password}     = req.body;
        let db                      = await connectDB();
        let scollection             = db.collection('students');
        let tcollection             = db.collection('teachers');
        //sorry really ugly ill fix it soon
        let s = await scollection.findOne({username})
        let t = await tcollection.findOne({username});
        if(!s && !t){
           return res.status(500).send("User Not Found");
        }
        let userPermissions = s?"student":"teacher";
        let user = s || t;
        let hash = md5(password);
        let passwordCorrect = hash == user.passwordHash;
        if(!passwordCorrect){
            return res.status(500).send("Password Incorrect");
            console.log("not correct")
        }

        let token = uuid();
 
        let state;
        if(userPermissions == "student"){
            state = await assembleStudentState(user)
        }else{
            state = await assembleTeacherState(user)
        }
        res.send({token,state});
    })
}