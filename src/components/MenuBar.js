import React, {useState, useContext, useEffect} from 'react'
import { Menu, Segment, Icon, Image} from 'semantic-ui-react';
import {Link} from 'react-router-dom'
import {AuthContext} from '../context/auth'
import Logo from "../images/logo.PNG";

function MenuBar() {


  const {user, logout} = useContext(AuthContext)
  //# user => {id, email, username, createdAt, token}}}


  const pathname = window.location.pathname;
  // /login

  const path = pathname === "/" ? "home" : pathname.substr(1,2)

  const [activeItem, setActiveItem] = useState(path)

  const [showMenu, setShowMenu] = useState(false);
  const [showSideBar, setShowSideBar] = useState(false);
    
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  const updateWidthAndHeight  = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
  }

  useEffect(() => {
      window.addEventListener("resize", updateWidthAndHeight);
      if(window.innerWidth > 635){
          setShowMenu(false);
          setShowSideBar(false);
      } else if (window.innerWidth < 635){
        setShowMenu(true);
      }
      return () => window.removeEventListener("resize", updateWidthAndHeight);
  })

  const handleItemClick = (e, { name }) => setActiveItem(name);

  const handleMenuClick = (e, {name}) => {
    setActiveItem(name);
    setShowSideBar(() => !showSideBar)
  }

    const menuBar = user? (
      (

        <Menu pointing secondary size="massive" color="violet">

<Image src={Logo} size="small" />       

<Menu.Item
            name='quacker'
            active={activeItem === 'quacker'} 
            onClick={handleItemClick}
            as={Link}
            to="/"
            color="black"
            style={{fontWeight:"700", fontSize:"20px", paddingLeft:"8px"}}
          />

          <Menu.Item
            name='home'
            active={activeItem === 'home'} 
            onClick={handleItemClick}
            as={Link}
            to="/"
          />

           
        
          <Menu.Menu position='right'>


          {
            !showMenu? (
              <>
            <Menu.Item
            name={user.username}
            active
            as={Link}
            to="/"
          />
              
            <Menu.Item
                name='logout'
                onClick={logout}
                style={{borderRadius:"2px", fontWeight:"800"}}
               
            >
               <Icon name="log out"/>  Logout
            </Menu.Item>
              </>
            ):(
              <Menu.Item
              name='menu'
              className="showMenuBar"
              active={activeItem === 'menu'}
              onClick={handleMenuClick}
                >
  
                <Icon name="bars" style={{fontSize:"large"}} />
  
              </Menu.Item>
            )
          }

         
          
            
          </Menu.Menu>

        </Menu>
   
    )
    ):( //NOT LOGGED IN
      (

        <Menu pointing secondary size="massive" color="violet">

          <Image src={Logo} size="small" />

            <Menu.Item
            name='quacker'
            active={activeItem === 'quacker'} 
            onClick={handleItemClick}
            as={Link}
            to="/"
            color="black"
            style={{fontWeight:"700", fontSize:"20px", paddingLeft:"8px"}}
          />
          <Menu.Item
            name='home'
            active={activeItem === 'home'}
            onClick={handleItemClick}
            as={Link}
            to="/"
          />


          <Menu.Menu position='right' >
              
           {!showMenu ? (
             <>
              <Menu.Item
              name='login'
              active={activeItem === 'login'}
              onClick={handleItemClick}
              as={Link}
              to="/login"
          />

          <Menu.Item
            name='register'
            active={activeItem === 'register'}
            onClick={handleItemClick}
            as={Link}
            to="/register"
           
          />
          </>

           ):(

            <Menu.Item
            name='menu'
            className="showMenuBar"
            active={activeItem === 'menu'}
            onClick={handleMenuClick}
              >

              <Icon name="bars" style={{fontSize:"large"}} />

            </Menu.Item>

           )
          
           }

          

          

            
          </Menu.Menu>

      
    

        </Menu>
   
    )
    )  //% Menu Bar End

    const sidebar = user && showSideBar? (

      <Menu pointing secondary size="massive" color="violet" className="sidebar_container">

      <Menu.Menu position='right' className="sidebar" >
       
       <Menu.Item
            name={user.username}
            active
            as={Link}
            to="/"
            style={{color:"red !important"}}
          />
              
            <Menu.Item
                name='logout'
                onClick={logout}
                style={{borderRadius:"2px", fontWeight:"800"}}
               
            >
               <Icon name="log out"/>  Logout
            </Menu.Item>
      </Menu.Menu>
      </Menu>
    ): !user && showSideBar?(

      <Menu pointing secondary size="massive" color="violet" className="sidebar_container">

      <Menu.Menu position='right' className="sidebar" >
            <Menu.Item
              name='login'
            
              active={activeItem === 'login'}
              onClick={handleItemClick}
              as={Link}
              to="/login"
          />

          <Menu.Item
            name='register'
            
            active={activeItem === 'register'}
            onClick={handleItemClick}
            as={Link}
            to="/register"
           
          />
      </Menu.Menu>

      </Menu>
     
    ):null


    return (
      <>

      {menuBar}
      {sidebar}
      </>
    );

}

export default MenuBar;