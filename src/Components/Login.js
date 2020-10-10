import React from 'react'
import Spotify_Icon_RGB_White from './Spotify_Icon_RGB_White.png';
import './Login.css';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
//import { fadeIn, flipInX } from 'react-animations'
import styled, { keyframes } from 'styled-components';

//const FadeIn = styled.div`animation: 2s ${keyframes`${fadeIn}`} infinite`;
//const FlipinX = styled.div`animation: 2s ${keyframes`${flipInX}`} infinite`;
const useStyles = makeStyles(() => ({
  buttonColor: {
    backgroundColor: "#1db954",
    padding: "20px",
    color:"white",
    fontWeight: 900,
    textDecoration: "none",
    borderRadius: "99px",
    fontSize: "x-large",
  }
}));
function Login(){
  const clientId = "266b3aa4139f4581b9b6211fbd3d7b00";
  const authEndpoint = "https://accounts.spotify.com/authorize";
  const redirectUri = "http://localhost:3000/home";
  const scopes = [
    "user-read-currently-playing",
    "user-read-recently-played",
    "user-read-playback-state",
    "user-top-read",
    "user-modify-playback-state",
    "playlist-read-private",
    "user-library-read",
    "user-follow-read",
  ];

  const loginURL = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`;
  const classes = useStyles();
  
  
  
  return(<div className="container">
  <div className="login">
  <div className="login_Logo"><img className="login_img" src={Spotify_Icon_RGB_White} alt="Logo"></img> &nbsp;<h1 className="heading">Spotify Trends</h1></div>
   <h3 className="sub_heading">Where music meets data.</h3>
<Button variant="contained" className= {classes.buttonColor}><a href = {loginURL} className="login_link">Log In to Spotify</a></Button>
</div>
</div>
  )
}

export default Login;