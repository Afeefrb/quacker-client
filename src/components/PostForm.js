import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import React from 'react';
import {Form, Button, } from 'semantic-ui-react';
import { FETCH_POSTS_QUERY } from '../util/graphql';
import { useForm } from '../util/util-hooks';




function PostForm() {

    const {inputValues, onChangeInput, onSubmitHandler} = useForm(createPostCallback, {
        body:''
    })

    const [createPost, {error}] = useMutation(CREATE_POST, {
        variables: inputValues,
        update(proxy,result){
            //# result => {data: {createPost: {id, email, username, createdAt, token}}}
            
            //? Data in the Appolo Client Cache=> data: {getPosts: [Post]}
            //# data: { getPosts: [ {id,username,body,likesCount,likes}, ...] }
            const data = proxy.readQuery({
                query: FETCH_POSTS_QUERY
            })
            //data.getPosts is the OLD CACHE
            //  data.getPosts = [result.data.createPost, ...data.getPosts]
            proxy.writeQuery({
                query: FETCH_POSTS_QUERY,
                data: {
                  getPosts: [result.data.createPost, ...data.getPosts],
                },
              });
            inputValues.body = ''
        },
        onError(err) {
                 return err;
        }
    })

    function createPostCallback(){
        createPost();
    }


    return (
        <>
           <Form onSubmit={onSubmitHandler}>
            <h2>Create a Post:</h2>
            <Form.Field>
                <Form.Input 
                    placeholder="Hi World"
                    name="body"
                    onChange={onChangeInput}
                    value={inputValues.body}
                    error={error? true: false} />
                <Button type="submit" color="teal">
                    Post
                </Button>
            </Form.Field>
        </Form>
      

        {error && (
        <div className="ui error message" style={{ marginBottom: 20 }}>
          <ul className="list">
            <li>{error.graphQLErrors[0].message}</li>
          </ul>
        </div>
      )}

        </>
        
    )
}

const CREATE_POST = gql`
    mutation createPost($body:String!){
        createPost(body:$body){
            id body createdAt username
            likes {id username createdAt}
            comments {id username body createdAt}
            likesCount
            commentCount
        }
    }
`;


export default PostForm
