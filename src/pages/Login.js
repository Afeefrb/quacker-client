import React, {useState, useContext} from 'react';
import {Form, Button} from 'semantic-ui-react'
import {useMutation} from '@apollo/react-hooks';
import gql from 'graphql-tag';

//CUSTOM HOOKS
import { useForm } from '../util/util-hooks';
import {AuthContext} from '../context/auth'

function Login(props) {

    const context = useContext(AuthContext);
    //# context => {user, login, logout}

    const [errors,setErrors] = useState({});

    const {inputValues, onChangeInput, onSubmitHandler} = useForm(login, { //% Sequence 1
        username:"",
        password:""
    })

    
   

    const [loginUser, {loading}] = useMutation(LOGIN_USER, { //% Sequence 3
        update(_,result) {
            //# result => {data: {login: {id, email, username, createdAt, token}}}
            context.login_Register(result.data.login)
            props.history.push("/")
        },
        onError(err){
            console.log("errorx: ",err.graphQLErrors[0].extensions.exception.errors);
            setErrors(err.graphQLErrors[0].extensions.exception.errors)
            //# errors: {username:"empty", email, password}

        },
        variables:inputValues
    })

    function login(){ //% Sequence 2
        loginUser()
    }

    return (
        <div className="form-container">
            <Form onSubmit={onSubmitHandler} noValidate>
                <h1>Login</h1>
                <Form.Input 
                    label="Username" 
                    placeholder="Username"
                    name="username"
                    type="text"
                    value={inputValues.username}
                    error={errors.username? true: false}
                    onChange={onChangeInput} />


                <Form.Input 
                    label="Password" 
                    placeholder="Password"
                    error={errors.password? true: false}
                    name="password"
                    type="password"
                    value={inputValues.password}
                    onChange={onChangeInput} /> 

            <Button type="submit" primary>Login</Button>
            </Form>

            {
                Object.keys(errors).length > 0 && (
                    <div className="ui error message">
                        <ul className="list">
                            {Object.values(errors).map(value=> (
                                <li key={Math.random() * 4}>
                                    {value}
                                </li>
                            ))}
                        </ul>
                    </div>

                )
            }
           
          
        </div>
    )
}

//# register(registerInput:RegisterInput): User! => {id, email, username, createdAt, token}

const LOGIN_USER = gql`

    mutation login( 
        $username: String!
        $password: String!
    ){   

        login(
                username: $username
                password: $password 
            )
        {
             id 
             username
             email
             createdAt
             token
        } 
    } 
   

  



`;

export default Login
