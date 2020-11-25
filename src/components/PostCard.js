import React, {useContext} from 'react';
import { Button, Card, Image, Label, Icon, Popup } from 'semantic-ui-react'
import moment from 'moment';
import {Link} from 'react-router-dom';
import { AuthContext } from '../context/auth';
import LikeButton from './LikeButton'
import DeleteButton from './DeleteButton';

const PostCard = ({post:{body, id, username, createdAt, commentCount, likesCount, likes}}) => {

    const {user} = useContext(AuthContext)
    //# user => {id, email, username, createdAt, token}}}


    const commentPostHandler = () => {
        console.log("commented");
    }

    return (
        <Card fluid >
      <Card.Content>
        <Image
          floated='right'
          size='mini'
          src='https://react.semantic-ui.com/images/avatar/large/molly.png'
        />
        <Card.Header> {username} </Card.Header>
        <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta> 
        {/* //# createdAt --> new Date().toISOString() */}
        <Card.Description  as={Link} to={`/posts/${id}`}>
          {body}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>


        <LikeButton user={user} post={{id, likes, likesCount}} />

        <Popup content="Comment on post"
          inverted
          trigger={
            <Button as='div' labelPosition='right' as={Link} to={`/posts/${id}`}>
            <Button color='blue' basic>
                <Icon name='comments' />
              
            </Button>
            <Label basic color='blue' pointing='left'>
                {commentCount}
            </Label>
        </Button>
          } />

       

        {user && user.username === username &&  <DeleteButton postId={id} /> }

      </Card.Content>
    </Card>
    )
}

export default PostCard
