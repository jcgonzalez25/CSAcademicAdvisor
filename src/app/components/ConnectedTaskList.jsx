import React from 'react';
import {connect} from 'react-redux';

const TaskList=({tasks})=>(
    <ul>
        {tasks.map(task=>(<li>{task.name}</li>))}
    </ul>
    )
class TaskList extends React.Component{
    render({tasks}){
        return (
            <ul>
                {tasks.map(task=>(<li>{task.name}</li>))}
            </ul>
        )
    }
}

const mapStateToProps=(state,ownProps)=>{
    return {
        tasks:state.tasks.filter(task=>task.group === ownProps.id)
    }
}

export const ConnectedTaskList = connect(mapStateToProps)(TaskList)