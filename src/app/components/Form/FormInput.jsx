import React from 'react'
import { connect } from 'react-redux';
import * as mutations from '../../store/mutations';
import { debug } from 'util';
import {ConnectedMessage} from './Message';



const NO_MATCH      = `NO MATCH`;
const MATCHED       = `MATCHED`;
const HASNT_FOCUSED = ""

const checkPatternMatch = (inputCurrentValue,inputType)=>{
    let Exp = RegExp('^.{8,10}$','g');
    if(inputType === "password"){
        return Exp.test(inputCurrentValue)?MATCHED:NO_MATCH;
    }else if(inputType === "text"){
        return Exp.test(inputCurrentValue)?MATCHED:NO_MATCH;
    }
}


/*
*
*   i tried passing state to props on a child component, but component didnt render based on that prop value
*
*
*/

const FormInput=({type,name,placeholder,displayName,inputValidationStatus,validate,id})=>(
    <div className="d-flex flex-column justify-content-center">
        <div>
            <span>{displayName}</span>
            <span>{inputValidationStatus}</span>
            <input type={type} name={name} placeholder={placeholder} onChange={validate}/>
        </div>
        <ConnectedMessage id={id} Vstatus={inputValidationStatus}/>
    </div>
)

const mapDispatchToProps = (dispatch,{id})=>{
    return {
        validate(e){ 
            let InputElement = e.target;
            let status  = checkPatternMatch(InputElement.value,InputElement.type);
            dispatch(mutations.updateInputValidationStatus({status,id}))
        }
    }
}

const mapStateToProps=(state,ownProps)=>{
    let {inputStates}         = state.userInterface;
    let inputState            = inputStates.find(element=>{element.id==ownProps.id});
    let inputValidationStatus = inputState===undefined?HASNT_FOCUSED:inputState.status;
    return {
        ...ownProps,
        inputValidationStatus
    }
}

export const ConnectedFormInput = connect(mapStateToProps,mapDispatchToProps)(FormInput);