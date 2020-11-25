import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Button, Label, Icon, Popup } from 'semantic-ui-react';


const LikeButton = ({post: {id, likes, likesCount}, user}) => {

    const [liked, setLiked] = useState(false);

    

    useEffect(() => {

        if(user && likes.find(like => like.username === user.username)) {
            setLiked(true)
        } else setLiked(false)
    
        
    }, [likes, user])

    const [likePost, {error}] = useMutation(LIKE_POST_MUTATION, {
        variables:{
            postId:id
        },
        onError(err) {
            console.log(err);
            return err;
         }
    })


    const likedButton = user ? (
        liked? (

            <Popup content="Unlike this" inverted trigger={
                <Button color='teal'>
                <Icon name='heart' />
            </Button>
            } />
    
           
        ) : (
            <Popup content="Like this" inverted trigger={
            <Button color='teal' basic>
                <Icon name='heart' />
                
            </Button>
              } />
        )
    ):(
            <Button color='teal' basic as={Link} to="/login">
                <Icon name='heart' />
                
            </Button>
    )

  
    return (
        <div>
            <Button as='div' labelPosition='right' onClick={likePost}>
            {likedButton}
            <Label basic color='teal' pointing='left'>
                {likesCount}
            </Label>
        </Button>
        </div>
    )
}

const LIKE_POST_MUTATION = gql`
    mutation likePost($postId: ID!){
        likePost(postId:$postId){
            id
            username
            likes {id username}
            likesCount
            body 
            createdAt
        }
    }

`;

export default LikeButton
