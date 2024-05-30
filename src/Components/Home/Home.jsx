import React, { useEffect,useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { BiPlay } from "react-icons/bi";
import "./Home.scss";
import axios from "axios";
const apikey="1e73e4421874dc64eeb5d14ec77518c1";
const url="https://api.themoviedb.org/3/"
const imgurl="https://image.tmdb.org/t/p/w500"
const upcoming="upcoming"
const nowplaying="now_playing"
const popular="popular"
const topRated="top_rated"
const Card=({img})=>{
  return(<img className="card" src={img} alt="cover"></img>);
}
const Row=({title,arr=[{
  img:"https://static1.srcdn.com/wordpress/wp-content/uploads/2017/07/Avengers-Infinity-War-SDCC-Banner-cropped.jpg?q=50&fit=contain&w=1140&h=&dpr=1.5"
}]})=>{
   return(<div className="row">
    <h2>{title}</h2>
    <div>
   {
    arr.map((item,index)=>(
      <Card key={index} img={`${imgurl}/${item.poster_path}`}/>
    ))

    }
   </div>
   </div>);
};
function Home() {
  const [upcomingmovies, setUpcomingMovies] = useState([])
  const [nowplayingmovies, setNowplaying] = useState([])
  const [Popularmovies, setPopularMovies] = useState([])
  const [topratedmovies, setTopratedMovies] = useState([])

  useEffect(()=>{
  const fetchUpcoming=async()=>{
   const{data:{results}}= await axios.get(`${url}/movie/${upcoming}?api_key=${apikey}`)
   setUpcomingMovies(results)
  //  console.log(upcomingmovies)
  };
  // for nowplaying
  const fetchNowplaying=async()=>{
    const{data:{results}}= await axios.get(`${url}/movie/${nowplaying}?api_key=${apikey}`)
    setNowplaying(results)
   //  console.log(upcomingmovies)
   };
  //  popular
  const fetchPopular=async()=>{
    const{data:{results}}= await axios.get(`${url}/movie/${popular}?api_key=${apikey}`)
    setPopularMovies(results)
   //  console.log(upcomingmovies)
   };
  //  toprated
  const fetchToprated=async()=>{
    const{data:{results}}= await axios.get(`${url}/movie/${topRated}?api_key=${apikey}`)
    setTopratedMovies(results)
   //  console.log(upcomingmovies)
   };
  
 fetchUpcoming()
 fetchNowplaying()
 fetchPopular()
 fetchToprated()
  },[]);
  
  
  // useEffect(() => {
  //   console.log(upcomingmovies); // Logging the updated state
  // }, [upcomingmovies]);
  return (
<section className="home">
  <div className="banner" style={{
    backgroundImage: Popularmovies[9] ? `url(${`${imgurl}/${Popularmovies[8].poster_path}`})`:"rgb(16,16,16)",
  }}>
    { Popularmovies[8] && <h1>{ Popularmovies[8].title}</h1>}
    { Popularmovies[8] && <p>{ Popularmovies[8].overview}</p>}
   <div> <button><BiPlay/>Play</button>
    <button>My List<AiOutlinePlus/></button></div>
  </div>

 
 <Row className="row" title={"Upcoming movies "} arr={upcomingmovies}/>
  <Row className="row" title={"NOW Playing movies "} arr={nowplayingmovies}/>
  <Row className="row" title={"Popular Movies "} arr={Popularmovies}/>
  <Row className="row" title={"TOP Rated Movies "} arr={topratedmovies}/>

</section>
  );
}

export default Home;
