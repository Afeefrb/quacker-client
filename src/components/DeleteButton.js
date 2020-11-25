import React, {useState} from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Button, Icon, Confirm, Popup } from 'semantic-ui-react';
import { FETCH_POSTS_QUERY } from '../util/graphql';


const DeleteButton = ({postId, commentId, callback}) => {

    const [confirmOpen, setConfirmOpen] = useState(false);

    const mutation = commentId?  DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION;

    const [deletePostorComment] = useMutation(mutation, {
        update(proxy){
            setConfirmOpen(false) 
                //deletes from the backend, but not the frontend cuz' of cache

                if(!commentId){

                     //? Data in the Appolo Client Cache=> data: {getPosts: [Post]}
                    //# data: { getPosts: [ {id,username,body,likesCount,likes}, ...] }

                    const data = proxy.readQuery({
                        query: FETCH_POSTS_QUERY
                    })
                    //data.getPosts is the OLD CACHE
                    
                    proxy.writeQuery({
                        query: FETCH_POSTS_QUERY,
                        data: {
                        getPosts : data.getPosts.filter(post => post.id !== postId),
                        },
                    });

                } //? if statement end xxx-----
           


            if(callback) callback()
        },
        variables: {
            postId,
            commentId   
        },
        onError(err){

            return err
        }
    })


    return (

        <>
        <Popup 
            content={commentId? "Delete comment" : "Delete post" }
            inverted
             trigger={
                <Button
                as="div"
                color="red"
                floated="right"
                onClick={() => setConfirmOpen(true)}
              >
                  <Icon name="trash" style={{margin:0}} />
                </Button>
             } />
       
          <Confirm
            open={confirmOpen}
            onCancel={()=> setConfirmOpen(false)}
            onConfirm={deletePostorComment} />
        </>
  
         
 
    )
}

const DELETE_POST_MUTATION = gql`
    mutation deletePost($postId:ID!){
        deletePost(postId:$postId)
    }
`;

const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($postId: ID!, $commentId: ID!) {
    deleteComment(postId: $postId, commentId: $commentId) {
      id
      comments {
        id
        username
        createdAt
        body
      }
      commentCount
    }
  }
`;

export default DeleteButton
