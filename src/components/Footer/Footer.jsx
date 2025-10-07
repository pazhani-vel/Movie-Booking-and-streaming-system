import React from "react"
import './Footer.css'
import insta from '/src/assets/Instagram.jpg'
import youtube from '/src/assets/youtube.jpg'

function Footerbar()
{
    return(
        <>
        <div className="footer">

            <center>
                <div className="icon-list">
                        <img src={insta} alt="insta" className="insta"/>
                        <img src={youtube} alt="youtube" className="youtube"/>
                </div>

        <div className="text-list">
           
                  <p>
                      Teams and Conditions
                  </p>
                
                   <p>
                     Privacy
                   </p>
                
        </div>

        <div className="rights">
            <p>@2025All Rights Received</p>
        </div>

            </center>

        </div>
        </>
    )
}

export default Footerbar;