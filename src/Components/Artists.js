import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import './Artists.css';
//import {getTokenFromUrl} from './Homepage'
import { CircularProgress, Paper, Avatar, Typography, List, ListItem, Divider, ListItemText, ListItemAvatar, Grid, Card, CardContent, CardActionArea} from '@material-ui/core';
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import {Pie} from 'react-chartjs-2';
import PieArtist from './PieArtist';
const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});
const useStyles = makeStyles((darkTheme) => ({
  root: {
    backgroundColor: darkTheme.palette.background.paper,
    padding:'20px'
  },
  paper: {
    padding: darkTheme.spacing(3),
    textAlign: 'center',
    color: darkTheme.palette.text.paper,
  },
}));

function Artists() {
  const [token, setToken] = useState(sessionStorage.getItem('token'));
  const [followersData, setFollowersData] = useState([]);
  const classes = useStyles();
  const artistEndpointUrl = "https://api.spotify.com/v1/me/following?type=artist&limit=10";
  
  const fetchfollowersDataHandler = async () => {
    return axios(artistEndpointUrl,{
      method:'GET',
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + `${token}`,
      }
    })
    .then((response)=>{
      console.log(response.data.artists.items)
      setFollowersData(response.data.artists.items)
      console.log(followersData) 
      //albums = response.data.items
      //console.log(albums) 
    })
    .catch(error=> {
      console.log(error); 
      //console.log(`token is :${token}`)
    });
  };
  useEffect(() => {
    fetchfollowersDataHandler();
    console.log(followersData)
  }, []);
    
  return (
    <div className="artists_content">
      {followersData?( 
      <div>
        <ThemeProvider theme={darkTheme}>
          <div style={{backgroundColor:"black", color:"white"}}>
            <Typography variant="h5">I. Artists you follow: No. of followers</Typography>
          </div>
          <Grid container style={{backgroundColor:'black'}} justify="center">
            <Grid item xs={8} style={{backgroundColor:'black', margin:'auto'}}>
              <Card className={classes.root} style={{backgroundColor:'#333333'}}>
                  <PieArtist 
                    followersData={followersData}
                  />
               
              </Card>
            </Grid>
          </Grid> 
        </ThemeProvider> 
      </div> 
  ):<CircularProgress color='white'/>}
  </div>
);
}

export default Artists;