import React from 'react';
import {connect} from 'react-redux';
import {ConnectedTaskList} from './ConnectedTaskList';
//import {ConnectedTasks} from './TaskList';
//has the ability to be passed groups
// in order to give it groups we must connect it 
const Dashboard = ({groups})=>(
    <div>
        <h2>Dashboard</h2>
        {groups.map(group=>(
            <div>
            <h1>{group.name}</h1>
            <ConnectedTaskList id={group.id}/>
            </div>
        ))}
    </div>
)
//whatever gets returned becomes the props of component
const mapStateToProps = (state, ownProps)=>{
    return{
        groups:state.groups
    }
}
export const ConnectedDashboard = connect(mapStateToProps)(Dashboard)