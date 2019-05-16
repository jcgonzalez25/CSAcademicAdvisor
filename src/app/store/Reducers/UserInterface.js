import * as mutations from '../mutations'; 

export function userInterface(userInterface = {formState:"login",inputStates:[]},action){
    let getUpdatedInputStates = (inputStates,{id,status})=>{
        const inputState = {status,id};
        if( inputStates.length === 0 ){
            inputStates.push(inputState);
        }else if(inputStates.find()){
            inputStates.map(iState=>{iState.id === id?iState.status=status:iState})
        }
        return inputStates;
    }
    switch(action.type){
        case mutations.FORM_UPDATE:
            return {...userInterface, formState:action.changeTo};
        case mutations.UPDATE_INPUT_VALIDATION_STATUS:
            let {inputStates} = userInterface || [];
            inputStates   = getUpdatedInputStates(inputStates,action.inputState);
            return {...userInterface,inputStates:[...inputStates]}
    }
    return userInterface;
}


