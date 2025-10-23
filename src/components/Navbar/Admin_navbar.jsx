import React from "react"
import './Navbar.css'
import icon from '/src/assets/Webicon.jpeg'
import {Link} from 'react-router-dom'

function Admin_Navigationbar()
{
    return(
        <>
<div className="Navbar">

    <div className="leftnavbar">
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link to="/admin_home"><img src={icon} alt="Icon" className="Webicon"/></Link>
        <div id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">

        </ul>
        </div>
        </nav>
    </div>

<div className="rightnavbar">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <form class="form-inline my-2 my-lg-0">
        <div className="signout">
            <Link to="/"><li>
        <a class="nav-link" href="#">sign out</a>
        </li>
    </Link>
        </div>
    
    </form>
    </nav>
</div>

        </div>

        </>
    )
}

export default Admin_Navigationbar;