import React from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom'
import * as mutations from '../store/mutations';
const TaskDetail = ({
    id,
    comments,
    student,
    isComplete,
    groups,setStudentMessage,setStudentGroup,setStudentCompletion
})=>(
    <div>
        <Link to="/Dashboard">Back To Dashboard</Link>
        <div>
            Message For Student:<br></br><textarea value={student.message} onChange={setStudentMessage}></textarea>
        </div>
        
        <div>
        Application Status:
        <br></br>
        <select onChange={setStudentGroup} value={student.group}>
            {groups.map(group=>(<option value={group.id}>{group.name}</option>))}
        </select>
        </div>
        <div>
            <Link to="/Dashboard">
                <button >Done</button>
            </Link>
        </div>

    </div>
);

const mapStateToProps = (state,ownProps)=>{
    let id = ownProps.match.params.id;
    console.log(id)
    let comments = state.comments.filter(comment=>comment.id == id)
    let student = state.students.find(student => student.id== id)
    let groups = state.groups;
    return {
        id,
        student,
        groups,
        isComplete:student.isComplete
    }
}
const mapDispatchToProps=(dispatch,ownProps)=>{
    const id = ownProps.match.params.id;
    return {
        setStudentCompletion(id,isComplete){
            dispatch(mutations.setStudentCompletion(id,isComplete));
        },
        setStudentGroup(e){
            dispatch(mutations.setStudentGroup(id,e.target.value));
        },
        setStudentMessage(e){
            dispatch(mutations.setStudentMessage(id,e.target.value));
        }
    }
}
export const ConnectedStudentDetail = connect(mapStateToProps,mapDispatchToProps)(TaskDetail);