import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import './Artists.css';
//import {getTokenFromUrl} from './Homepage'
import { CircularProgress, Paper, Avatar, Typography, List, ListItem, Divider, ListItemText, ListItemAvatar, Grid, Card, CardContent, CardActionArea} from '@material-ui/core';
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import {Pie} from 'react-chartjs-2';
const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});
const useStyles = makeStyles((darkTheme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 1,
    backgroundColor: darkTheme.palette.background.paper,
    margin: "auto"
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
    const artistLabel = followersData.map(item=>{
    return( item.name ) })
    const artistFollowers = followersData.map(item=>{
    return( item.followers.total)  })
    const chartData1 = {
     labels: artistLabel,
     datasets: [
      {
        label: 'Followers',
        backgroundColor: [
          '#420420',
          '#cbcba9',
          '#ffffff',
          '#407294',
          '#133337',
          '#065535',
          '#ff7373',
          '#5ac18e',
          '#800000',
          '#7fe5f0',
        ],
        hoverBackgroundColor: [
        'rgba(66, 4, 32, 0.5)',
        'rgba(203, 203, 169, 0.5)',
        'rgba(255, 255, 255, 0.5)',
        'rgba(64, 114, 148, 0.5)',
        'rgba(19, 51, 55, 0.5)',
        'rgba(6, 85, 53, 0.5)',
        'rgba(255, 115, 115, 0.5)',
        'rgba(90, 193, 142, 0.5)',
        'rgba(128, 0, 0, 0.5)',
        'rgba(127, 229, 240, 0.5)'
        ],
        data: artistFollowers
      }
               ]
            }
  return (
    <div className="artists_content">
      <h1>Artistsss</h1>
      <Pie
          data={chartData1}
          options={{
            title:{
              display:true,
              text:'Artist Followers',
              fontSize:20
            },
            legend:{
              display:true,
              position:'right'
            }
          }}
        />

    </div>
  );
}

export default Artists;