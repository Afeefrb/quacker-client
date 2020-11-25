import React, {useContext} from 'react';
import { AuthContext } from '../context/auth';
import {useQuery} from '@apollo/react-hooks';


import { Grid, Image,Transition } from 'semantic-ui-react'
import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';
import { FETCH_POSTS_QUERY } from '../util/graphql';


function Home() {

    const {user} = useContext(AuthContext);
    //# user => {id, email, username, createdAt, token}}}

    const {loading, data} = useQuery(FETCH_POSTS_QUERY)
    //# data: { getPosts: [ {id,username,body,likesCount,likes}, ...] }

    return(
    <Grid columns={3}>
        <Grid.Row className="page-title" >
            <h1>Recent Posts</h1>
        </Grid.Row>
        <Grid.Row>
            {user && (
                <Grid.Column>
                    <PostForm />
                </Grid.Column>
            )}
            {
                loading? (
                    <h1>Loading...</h1>
                ):(
                  <Transition.Group>
                      {   data && data.getPosts.map(post => (
                        <Grid.Column key={post.id} style={{marginBottom:20}}>
                            <PostCard post={post} />
                        </Grid.Column>
                    ))}
                  </Transition.Group>
                )
            }
        </Grid.Row>
    </Grid>
    )
    
    
}

export default Home
