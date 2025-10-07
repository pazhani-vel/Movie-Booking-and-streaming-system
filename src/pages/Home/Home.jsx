import React,{useState,useEffect} from "react"
import './Home.css'
import Navigationbar from "../../components/Navbar/Navbar";
import banner_image from "/src/assets/Bannerimage.jpg"
import Footerbar from "../../components/Footer/Footer";
import Card from "../Card/Card";
import poster from "/src/assets/poster.webp"
import loadingVideo from '/src/assets/Loading.mp4'

function Home()
{

    const [Cards,setcard]=useState(null);
    const [TopMovieCards,settopmoviecard]=useState(null);
    
  useEffect(
    ()=>
    {

      fetch("http://localhost:5000/get")
      .then((item)=>item.json())
      .then((item)=>setcard(item))
      .catch((error)=>console.log(error))
    }
  ,[])

  useEffect(
    ()=>
    {

      fetch("http://localhost:5000/gettopmovie")
      .then((item)=>item.json())
      .then((item)=>settopmoviecard(item))
      .catch((error)=>console.log(error))
    }
  ,[])

  if(Cards==null || TopMovieCards==null)
  {
    return(
        <>
        <div className="loading">
      <video
        src={loadingVideo}
        autoPlay
        loop
        muted
        playsInline
        style={{ width: "60vw",          
          height:  "60vh",         }}
      />
    </div>
        </>
    )
  }


    return(
        <div>

            <Navigationbar/>

            <div className="Banner">
    <img src={banner_image} alt="" className="Bannerimage" />
    <div className="Banner_caption">
        <h1 style={{ fontWeight: 'bold', fontSize: '3rem', letterSpacing: '2px', margin: '12px 0', textShadow: '2px 2px 8px #222' }}>
            Spider-Man: New Brand Day
        </h1>
        <p style={{ fontSize: '1.25rem', marginBottom: '0', textShadow: '1px 1px 3px #444' }}>
            Coming Soon....
        </p>
        <h2>🔥Unlimited Movies. Infinite Emotions.</h2>
    </div>
</div>


            <div className="card">
                <h2>Top Movies</h2>
                <div className="card-list">
                    {
                    TopMovieCards.map(
                        (movie)=> <Card name={movie.title} genre={movie.genre} poster={movie.poster} id={movie._id} />
                    )
                    }
                </div>                 
            </div>

            <div className="card">
                <h2>Movies</h2>
                <div className="card-list">
                    {
                    Cards.map(
                        (movie)=> <Card name={movie.title} genre={movie.genre} poster={movie.poster} id={movie._id} />
                    )
                    }
                </div>                 
            </div>

            <Footerbar/>
        </div>
    )
}

export default Home;