import gql from 'graphql-tag';
import React , {useContext, useState, useRef} from 'react'
import {useQuery,useMutation} from '@apollo/react-hooks'
import { AuthContext } from '../context/auth';
import { Card, Grid, Image, Button, Icon, Label, Form} from 'semantic-ui-react';
import moment from 'moment';
import LikeButton from '../components/LikeButton';
import DeleteButton from '../components/DeleteButton';

const SinglePost = (props) => {

    const postId = props.match.params.postId;
    // console.log(postId);

    const commentInputBlur = useRef(null)

    const [comment, setComment] = useState('');

    const { user } = useContext(AuthContext);

    const [submitComment] = useMutation(SUBMIT_COMMENT_MUTATION, {
      update(){
        setComment('')
        commentInputBlur.current.blur();
      },
      variables: {
        postId,
        body:comment
      },
      onError(err){
        return err
      }
    })

    const {
        data
      } = useQuery(FETCH_POST_QUERY, {
        variables: {
          postId
        }
      });

      //# data: {getPost: {id, body, created, username, likes:[], comments:[], etc}

      function deletePostCallback(){
        props.history.push("/")
      }

    
    let postMarkup;
    
    if(!data?.getPost) {
        postMarkup = <h1>Loading..</h1>
    } else {
        console.log("getPost: ", data.getPost);
        const { id, body, createdAt, username, comments, likes, likesCount, commentCount
          } = data.getPost;

          postMarkup = (
              <Grid>
                  <Grid.Column width={2}>
                    <Image src='https://react.semantic-ui.com/images/avatar/large/molly.png'
                        size="small" float="right" />
                  </Grid.Column>
                  <Grid.Column width={10}>
                        <Card fluid>
                            <Card.Content>
                                <Card.Header>{username}</Card.Header>
                                <Card.Meta>
                                    {moment(createdAt).fromNow()}
                                </Card.Meta>
                                <Card.Description> {body} </Card.Description>
                            </Card.Content>
                            <hr/>
                            <Card.Content extra>
                                <LikeButton user={user} post={{id, likesCount, likes}}   />
                                <Button 
                                    as="div"
                                    labelPosition="right"
                                    onClick={()=> console.log("button")}  >

                                        <Button basic color="blue">
                                            <Icon name="comments" />
                                        </Button>

                                        <Label 
                                            basic color="blue" 
                                            pointing="left">    
                                            {commentCount} 
                                        </Label>

                                </Button>

                                {user && user.username === username && (
                                  <DeleteButton postId={id} callback={deletePostCallback} />
                                )}

                            </Card.Content>
                        </Card>

                         {user && (
                           <Card fluid>
                             <Card.Content>
                             <p>Post a comment</p>
                              <Form>
                                  <div className="ui action input fluid">
                                    <input 
                                      type="text"
                                      placeholder="Comment here"
                                      name="comment"
                                      value={comment}
                                      onChange={e => setComment(e.target.value)}
                                      ref={commentInputBlur} />

              <                     button
                                      type="submit"
                                      className="ui button teal"
                                      disabled={comment.trim() === ''}
                                      onClick={submitComment}
                                    >
                                      Submit
                                    </button>
                                  </div>
                              </Form>
                             </Card.Content>
                             
                           </Card>
                         )}          

                        {comments.map((comment => (
                          <Card fluid key={comment.id}>
                            <Card.Content>
                            {user && user.username === comment.username && (
                              <DeleteButton postId={id} commentId={comment.id} />
                            )}
                              <Card.Header> {comment.username} </Card.Header>
                              <Card.Meta> {moment(comment.createdAt).fromNow()} </Card.Meta>
                              <Card.Description> {comment.body} </Card.Description>
                            </Card.Content>
                          </Card>
                        )))}
                  </Grid.Column>
              </Grid>
          )
          
    
    }

    return postMarkup;
}

const SUBMIT_COMMENT_MUTATION = gql`
  mutation createComment($postId: String!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      id
      comments {
        id
        body
        createdAt
        username
      }
      commentCount
    }
  }
`;

const FETCH_POST_QUERY = gql`
  query($postId: ID!) {
    getPost(postId: $postId) {
      id
      body
      createdAt
      username
      likesCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;

export default SinglePost
