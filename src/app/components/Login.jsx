import { connect } from 'react-redux';
import React from 'react';
import * as mutations from '../store/mutations';

import { Link } from 'react-router-dom';
let onLogin = true;

//will map state to registration and login components 

const LoginForm = ({authorizeLogin,session,updateForm})=>(
    <div className=" d-flex h-100 align-items-center justify-content-center">
        
    <form onSubmit={authorizeLogin}>
        <div className="d-flex justify-content-center">
            <h1 className="display-1 text-center ">
                CS ADVISING LOGIN
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
        <input type="text" placeholder="username" name="username" defaultValue="DEV"></input>
        <input type="password" placeholder="password" name="password" defaultValue="fd"></input>
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
        <div className="d-flex justify-content-center">
            <span>First Name:</span><input type="text" placeholder="first name" name="first_name" ></input>
        </div>
        <div className="d-flex justify-content-center">
            <span>Last Name:</span><input type="text" placeholder="last name" name="last_name"></input>
        </div>
        <div className="d-flex justify-content-center">
            <span>Username:</span><input type="text" placeholder="username" name="username"></input>
        </div>
        <div className="d-flex justify-content-center">
            <span>Password:</span><input type="password" placeholder="password" name="password" ></input>
        </div>
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
