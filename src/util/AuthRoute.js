import React, {useContext} from 'react'
import {Redirect,Route} from 'react-router-dom';
import  {AuthContext} from '../context/auth';

function AuthRoute({component:Component, ...rest}){
    //# ...rest => exact, path
    //# component => component ={Login},etc...
    const {user} = useContext(AuthContext);
    return (
        <Route  
            {...rest}
            render={ (props) =>
                user? <Redirect to="/" /> : <Component {...props} />
            
            } 
        />
    )

}

export default AuthRoute;