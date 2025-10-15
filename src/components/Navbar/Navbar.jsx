import React from "react"
import './Navbar.css'
import icon from '/src/assets/Webicon.jpeg'
import {Link} from 'react-router-dom'

function Navigationbar()
{
    return(
        <>
<div className="Navbar">

    <div className="leftnavbar">
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <img src={icon} alt="Icon" className="Webicon"/>
        <div id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
            <Link to="/home"><li class="nav-item active">
        <a class="nav-link" href="#">Home</a>
        </li>
            </Link>
        
        <Link to="/TicketBookingpage"><li>
        <a class="nav-link" href="#">Ticket Booking</a>
        </li></Link>
        <Link to="/mybookingpage"><li>
        <a class="nav-link" href="#">My Booking</a>
        </li>
        </Link>
        
        <Link to="/"><li>
        <a class="nav-link" href="#">sign out</a>
        </li>
        </Link>
        
        </ul>
        </div>
        </nav>
    </div>

<div className="rightnavbar">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <form class="form-inline my-2 my-lg-0">
    <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
    <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
    </form>
    </nav>
</div>

        </div>

        </>
    )
}

export default Navigationbar;