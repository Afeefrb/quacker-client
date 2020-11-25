import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import AuthRoute from './util/AuthRoute';

//CSS
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import { Container } from 'semantic-ui-react'

//Components
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import MenuBar from './components/MenuBar';


import { AuthProvider } from './context/auth';
import SinglePost from './pages/SinglePost';


function App() {
  return (
    <AuthProvider>
      <Router>
          <Container>
            <MenuBar />
            <AuthRoute path="/login" component={Login} />
            <AuthRoute path="/register" component={Register} />
            <Route exact path="/" component={Home} />
            <Route exact path="/posts/:postId" component={SinglePost} />
          </Container>
      </Router>
    </AuthProvider>
    
  );
}



export default App;
