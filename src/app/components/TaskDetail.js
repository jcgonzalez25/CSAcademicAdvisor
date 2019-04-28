import React from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom'
import * as mutations from '../store/mutations';
const TaskDetail = ({
    id,
    comments,
    task,
    isComplete,
    groups,setTaskCompletion,setTaskGroup,setTaskName
})=>(
    <div>
        <Link to="/Dashboard">Back To Dashboard</Link>
        <div>
            <input value={task.name} onChange={setTaskName}></input>
        </div>
        <button onClick={()=>setTaskCompletion(id,!isComplete)}>{isComplete? `Reopen`: `Complete`}</button><br></br>
        <div>
        <select onChange={setTaskGroup} value={task.group}>
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
    let comments = state.comments.filter(comment=>comment.id == id)
    let task = state.tasks.find(task => task.id== id)
    let groups = state.groups;
    return {
        id,
        task,
        groups,
        isComplete:task.isComplete
    }
}
const mapDispatchToProps=(dispatch,ownProps)=>{
    const id = ownProps.match.params.id;
    return {
        setTaskCompletion(id,isComplete){
            dispatch(mutations.setTaskCompletion(id,isComplete))
        },
        setTaskGroup(e){
            dispatch(mutations.setTaskGroup(id,e.target.value))
        },
        setTaskName(e){
            dispatch(mutations.setTaskName(id,e.target.value))
        }
    }
}
export const ConnectedTaskDetail = connect(mapStateToProps,mapDispatchToProps)(TaskDetail);