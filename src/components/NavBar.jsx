import React from 'react'
import { NavLink } from 'react-router-dom'
import './NavBar.css'
function NavBar() {
  return (
    <div className='sideNav active'>
        <ul>
            <li><a href=""><NavLink to='/home'>Home</NavLink></a></li>
            <li><a href=""><NavLink to='/users'>Users</NavLink></a></li>
            <li><a href=""><NavLink to='/products'>Proudcts</NavLink></a></li>
            <li><a href=""><NavLink to='/categories'>Categories</NavLink></a></li>
            <li><a href=""><NavLink to='/pos'>POS</NavLink></a></li>
        </ul>
    </div>
  )
}

export default NavBar