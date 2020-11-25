import gql from 'graphql-tag';


//# getPosts: [Post] => id body createdAt username comments likes likesCount commentCount

 export const FETCH_POSTS_QUERY = gql`
 {
     getPosts{ 
         id username body createdAt likesCount
         likes {id username}
         commentCount 
         comments {id body username createdAt}
     }
 }
`;