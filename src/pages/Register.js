import React, {useState, useContext} from 'react';
import {Form, Button} from 'semantic-ui-react'
import {useMutation} from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { useForm } from '../util/util-hooks';
import { AuthContext } from '../context/auth';


function Register(props) {

    const context = useContext(AuthContext);
    
    const [errors,setErrors] = useState({});


    const {inputValues, onChangeInput, onSubmitHandler} = useForm(register,{ //% SEQUENCE 1
        username:"",
        email:"",
        password:"",
        confirmPassword:""
    })


   

    const [addUser, {loading}] = useMutation(REGISTER_USER, { //% SEQUENCE 3
        update(proxy,result) {
            //# result => {data: {register: {id, email, username, createdAt, token}}}
            context.login_Register(result.data.register)
            props.history.push("/")
        },
        onError(err){
            console.log("errorx: ",err.graphQLErrors[0].extensions.exception.errors);
            setErrors(err.graphQLErrors[0].extensions.exception.errors)
            //# errors: {username:"empty", email, password}

        },
        variables:inputValues
    })

    function register(){   //% SEQUENCE 2
        addUser()
    }

    
    return (
        <div className="form-container">
            <Form onSubmit={onSubmitHandler} noValidate>
                <h1>Register</h1>
                <Form.Input 
                    label="Username" 
                    placeholder="Username"
                    name="username"
                    type="text"
                    value={inputValues.username}
                    error={errors.username? true: false}
                    onChange={onChangeInput} />

                 <Form.Input 
                    label="Email" 
                    placeholder="Email"
                    name="email"
                    type="email"
                    value={inputValues.email}
                    error={errors.email? true: false}
                    onChange={onChangeInput} /> 

                <Form.Input 
                    label="Password" 
                    placeholder="Password"
                    error={errors.password? true: false}
                    name="password"
                    type="password"
                    value={inputValues.password}
                    onChange={onChangeInput} /> 

                 <Form.Input 
                    label="ConfirmPassword" 
                    placeholder="ConfirmPassword"
                    name="confirmPassword"
                    type="password"
                    error={errors.confirmPassword? true: false}
                    value={inputValues.confirmPassword}
                    onChange={onChangeInput} /> 

            <Button type="submit" primary>Register</Button>
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

const REGISTER_USER = gql`

    mutation register( 
        $username: String!
        $email: String!
        $password: String!
        $confirmPassword: String!
    ){   

        register(
            registerInput:{
                username: $username
                email: $email
                password: $password
                confirmPassword: $confirmPassword
            }
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

export default Register
