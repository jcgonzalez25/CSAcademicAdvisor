import React from 'react';

export class Forms extends React.Component{
    render(){
        return(
            <div className="forms_wrapper">
                <form className="d-flex flex-row-reverse">
                    <div>
                        First Name:<input type="text"/>
                    </div>
                    <div>
                        Last Name:<input type="text"/>
                    </div>
                    <div>
                        Class:<input type="text"/>
                    </div>
                </form>                
            </div>
        )
    }
}