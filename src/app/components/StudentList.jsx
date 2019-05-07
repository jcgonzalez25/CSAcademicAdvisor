import React from 'react';
import {connect} from 'react-redux';
import {requestTaskCreation} from '../store/mutations';
import { Link } from 'react-router-dom';
//TaskList
//changed the link to student
class StudentList extends React.Component{
    render(){
        const {students, createNewStudent} = this.props;
        return (
            <div>
            <table className="table table-hover">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                    <th scope="col">ID</th>
                    <th scope="col">Message To User</th>
                </tr>
                </thead>
                <tbody>
                {students.map((student,index)=>(
                <tr>
                    <th scope="row"><Link to={`/student/${student.id}`}  key={student.id}>{index}</Link></th>
                    <td>
                        {student.fname}
                    </td>
                    <td>
                        {student.lname}
                    </td>
                    <td>
                        {student.id}
                    </td>
                    <td>
                        {student.message}
                    </td>
                </tr>
                ))}
                </tbody>
            </table>
            </div>
        )
    }
}

const mapStateToProps=(state,ownProps)=>{
    return {
        students:state.students.filter(student=>student.group === ownProps.id)
    }
}
const mapDispatchToProps=(dispatch,ownProps)=>{
    return {
        createNewStudent(id){
            dispatch(requestTaskCreation(id));
        }
    }
}

export const ConnectedStudentList = connect(mapStateToProps,mapDispatchToProps)(StudentList)