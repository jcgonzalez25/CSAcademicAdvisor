import React from 'react';
import { checkPropTypes } from 'prop-types';
import { connect } from 'react-redux';

const giveStatus = (statusId)=>{
    switch(statusId){
        case "G1":
            return "Account Created But Application Still needs reviewing";
        case "G2":
            return "Application Denied";
        case "G3":
            return "Application Accepted"
    }
}
export const StudentPage = ({fname,lname,message,group})=>(
    <div>
        Welcome:{fname} {lname}
        <div>
            message from kinne : {message}
        </div>
        <div>
            Applications Status: {giveStatus(group)}
        </div>
    </div>
)

const mapStateToProps =(state,ownProps)=>{
    let {lname,fname,message,group} = state.student;
    return {
        fname,
        lname,
        message,
        group
    }
}

export const ConnectedStudentPage = connect(mapStateToProps)(StudentPage);