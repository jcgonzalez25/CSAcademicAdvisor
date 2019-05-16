import { connect } from 'react-redux';
import React from 'react';
import * as mutations from '../../store/mutations';
import {ConnectedFormInput as FormInput} from './FormInput';
import { Link } from 'react-router-dom';
let onLogin = true;

//will map state to registration and login components 

const LoginForm = ({authorizeLogin,session,updateForm})=>(
    <div className=" d-flex h-100 align-items-center justify-content-center">
        
    <form onSubmit={authorizeLogin}>
        <div className="d-flex justify-content-center">
            <h1 className="display-1 text-center ">
                CS ADVISING 
            </h1>
        </div>
        {session.registration_status === mutations.REGISTRATION_COMPLETE?
            <div className="d-flex justify-content-center"><div class="alert alert-success" role="alert">
            Sucess You Created An Account
          </div></div>:null}
        {session.authenticated === mutations.NOT_AUTHENTICATED?<div className="d-flex justify-content-center">
            <div className="alert alert-danger" role="alert">
                didnt work please try again</div>
            </div>:null}
        <div className="d-flex justify-content-center">
        <input type="text" placeholder="username" name="username"></input>
        <input type="password" placeholder="password" name="password"></input>
        </div>
        <div className="d-flex justify-content-center">
            <button type="submit">Login</button>
            <button onClick={(e)=>updateForm(e,"register")}>New Student Registration</button>
        </div>
    </form>

    </div>
)
const RegisterForm = ({updateForm,registerUser,session})=>(
    <div className="h-100 d-flex align-items-center justify-content-center">
    <form onSubmit={registerUser}>
        {session.registration_status == mutations.REGISTRATION_FAILED?<div>sorry registration failed, please try a different username or password</div>:null}
        <FormInput type="text" placeholder="First Name" name="first_name" displayName="First Name:" id={1}/>
        <FormInput type="text" placeholder="Last Name" name="last_name" displayName="Last Name:" id={2}/>
        <FormInput type="text" placeholder="User Name" name="username" displayName="User Name:" id={3}/>
        <FormInput type="password" placeholder="Password" name="password" displayName="Password:" id={4}/>
        <div className="d-flex justify-content-center">
            <button type="submit">Register</button>
            <button onClick={(e)=>updateForm(e,"login")}>back to login</button>
        </div>
    </form>
    </div>
)

const Form = ({authorizeLogin,session,updateForm,formState,registerUser})=>(
    <div className={onLogin?"login":"register"} >
        {formState=="login"?
            <LoginForm session={session} authorizeLogin={authorizeLogin} updateForm={updateForm}/>:
            <RegisterForm updateForm={updateForm} registerUser={registerUser} session={session}/>}
    </div>
);















const mapStateToProps = ({session,userInterface})=>({
    session:session,
    formState:userInterface.formState,
});

const mapDispatchToProps = (dispatch)=>{
    return {
        authorizeLogin(e){
            e.preventDefault();
            let username = e.target['username'].value;
            let password = e.target['password'].value;
            dispatch(mutations.requestAuthenticateUser(username,password));
        },
        updateForm(e,to){
            e.preventDefault();
            dispatch(mutations.requestFormUpdate(to))
        },
        registerUser(e){
            e.preventDefault();
            let username = e.target['username'].value;
            let password = e.target['password'].value;
            let first_name = e.target['first_name'].value;
            let last_name = e.target['last_name'].value;
            dispatch(mutations.requestRegistration(username,password,first_name,last_name));
        }
    }
}
export const ConnectedLogin = connect(mapStateToProps,mapDispatchToProps)(Form);
