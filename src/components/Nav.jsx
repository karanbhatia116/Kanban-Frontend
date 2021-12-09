import React from 'react'
import AccountCircleRounded from '@material-ui/icons/AccountCircleRounded'
import LogoutIcon from '@material-ui/icons/ExitToAppOutlined';
import '../styles/Nav.css'
import {Link} from 'react-router-dom';
function Nav({hasLoggedIn, setHasLoggedIn}) {

    const handleLogout = () =>{
        setHasLoggedIn(false);
        localStorage.removeItem('user');
    }
    return (
        <nav className = 'navbar'>
            <Link to='/home' style={{textDecoration: 'none', color: 'inherit'}}> <h2>Kanban Board</h2> </Link>
            <ul className='navlinks'>
                <Link to='/settings' style={{textDecoration: 'none', color: 'inherit'}}> <li> Profile <AccountCircleRounded></AccountCircleRounded> </li> </Link>
                {hasLoggedIn && <Link to ='#' style={{textDecoration: 'none', color: 'inherit'}} onClick = {handleLogout}> <li> Logout <LogoutIcon> </LogoutIcon></li> </Link>}
                
            </ul>
        </nav>
    )
}

export default Nav
