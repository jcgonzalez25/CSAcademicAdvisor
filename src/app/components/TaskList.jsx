import React from 'react';
import {connect} from 'react-redux';
import {requestTaskCreation} from '../store/mutations';
import { Link } from 'react-router-dom';
class TaskList extends React.Component{
    render(){
        return (
            <div>
            <ul>
                {this.props.tasks.map(task=>(
                <Link to={`/task/${task.id}`}  key={task.id}>
                    <li>{task.name}</li>
                </Link>))}
            </ul>
            <button onClick={()=>this.props.createNewTask(this.props.id)}>Add</button>
            </div>
        )
    }
}

const mapStateToProps=(state,ownProps)=>{
    return {
        tasks:state.tasks.filter(task=>task.group === ownProps.id)
    }
}
const mapDispatchToProps=(dispatch,ownProps)=>{
    return {
        createNewTask(id){
            dispatch(requestTaskCreation(id));
        }
    }
}

export const ConnectedTaskList = connect(mapStateToProps,mapDispatchToProps)(TaskList)