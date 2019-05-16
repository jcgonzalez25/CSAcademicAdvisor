import React from 'react';
import { connect } from 'react-redux';

const NO_MATCH      = `NO MATCH`;
const MATCHED       = `MATCHED`;
const HASNT_FOCUSED = "";

const Message =({inputValidationStatus})=>{
    const noMatchClassName      = `alert alert-danger`;
    const matchedClassName      = `alert alert-success`;
    const hasntFocusedClassName = "d-none";
    switch(inputValidationStatus){
        case HASNT_FOCUSED:
            return <div className={hasntFocusedClassName}></div>;
        case NO_MATCH:
            return <div className={noMatchClassName} role="alert">Input Not Valid</div>
        case MATCHED:
            return <div className={matchedClassName} role="alert">Valid</div>
    }
}

let mapStateToProps=({userInterface},{id,Vstatus})=>{
    let inputState = userInterface.inputStates.find(e=>id==e.id) || HASNT_FOCUSED
    let inputValidationStatus = inputState == HASNT_FOCUSED?HASNT_FOCUSED:inputState.status;
    return {
        inputValidationStatus
    }
}
export const ConnectedMessage = connect(mapStateToProps)(Message)
