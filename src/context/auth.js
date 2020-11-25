import React,{createContext, useReducer, useContext} from 'react';
import jwtDecode from'jwt-decode';


const initialState = {
    user:null
}

//# user => {id, email, username, createdAt, token}}}

if(localStorage.getItem("jwtToken")){
    const decodedToken = jwtDecode(localStorage.getItem('jwtToken'));

    if(decodedToken.exp * 1000 < Date.now()) {
        localStorage.removeItem('jwtToken')
    } else {
        initialState.user = decodedToken
    }
}

const AuthContext = createContext({
    user: null,
    login_Register: (userData) => {}, //calls the function in the AuthProvider function
    logout: () => {}
})

//# user => {id, email, username, createdAt, token}}}



function authReducer(state,action){
    switch(action.type) {
        case "LOGIN_REGISTER": 
            return {
                ...state,
                user:action.payload
            }
        case "LOGOUT":
            return {
                ...state,
                user:null
            }
        default:
            return state
    }
}

function AuthProvider(props) {
    const [state,dispatch] = useReducer(authReducer,initialState);

    function login_Register(userData){
        //# userData => {id, email, username, createdAt, token}}}
        localStorage.setItem("jwtToken", userData.token)
        dispatch({
            type:"LOGIN_REGISTER",
            payload: userData
            
        })
    }

    function logout(){
        localStorage.removeItem("jwtToken")
        dispatch({
            type:"LOGOUT"
        })
    }

    return(
        <AuthContext.Provider  
            value={{user:state.user, login_Register, logout}}
                {...props} />
    )
}

export {AuthContext, AuthProvider}