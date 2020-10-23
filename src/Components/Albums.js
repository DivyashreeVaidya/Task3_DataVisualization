import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import './Albums.css';
import {Bar} from 'react-chartjs-2';
//import {getTokenFromUrl} from './Homepage'
import { CircularProgress, Paper, Avatar, Typography, List, ListItem, Divider, ListItemText, ListItemAvatar, Grid, Card, CardContent, CardActionArea} from '@material-ui/core';
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});
const useStyles = makeStyles((darkTheme) => ({
  root: {
    backgroundColor: darkTheme.palette.background.paper,
    margin: "auto"
  },
  paper: {
    padding: darkTheme.spacing(3),
    textAlign: 'center',
    color: darkTheme.palette.text.paper,
  },
}));

function Albums() {
  //const _token = getTokenFromUrl();
  const [token, setToken] = useState(sessionStorage.getItem('token'));
  const [albumData, setAlbumData] = useState([]);
  const classes = useStyles();
  const albumEndpointUrl = 'https://api.spotify.com/v1/me/albums';
  const matches = useMediaQuery('(max-width:600px)');
  let albums;
  
  
  const fetchAlbumDataHandler = async () => {
    return axios(albumEndpointUrl,{
      method:'GET',
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + `${token}`,
      }
    })
    .then((response)=>{
      //sessionStorage.setItem('album1',JSON.stringify(response));
      console.log(response.data.items)
      setAlbumData(response.data.items)
      console.log(albumData) 
      //albums = response.data.items
      //console.log(albums) 
    })
    .catch(error=> {
      console.log(error); 
      console.log(`token is :${token}`)});
  };
  useEffect(() => {
    fetchAlbumDataHandler();
    console.log(albumData)
  }, []);

  //const [albumData,setAlbumData] = useState(JSON.parse(sessionStorage.getItem('album1')));
  const albumLabel = albumData.map(item => {
    return( item.album.name)  })
    const albumPopularity = albumData.map(item=>{
    return( item.album.popularity )  })
    const albumTracks = albumData.map(item=>{
      return( item.album.total_tracks )})
      console.log(albumLabel)
      console.log(albumPopularity)
      console.log(albumTracks)
      const chartData1 = {
     labels: albumLabel,
     datasets: [
              {
               label: 'Saved Albums: Popularity',
               backgroundColor: 'rgba(29,185,84,0.8)',
               borderColor: 'rgba(0,0,0,1)',
               borderWidth: 2,
               data: albumPopularity
               }
               ]
            }
            const chartData2 = {
              labels: albumLabel,
              datasets: [
              {
               label: 'Saved Albums: Total Tracks',
               backgroundColor: 'rgba(29,185,84,0.8)',
               borderColor: 'rgba(0,0,0,1)',
               borderWidth: 2,
               data: albumTracks
               }
               ]
            }  
  return (<div className="album_content">
           { albumData? (<div>
    
    <ThemeProvider theme={darkTheme}>
    <div style={{backgroundColor:"black", color:"white"}}><Typography variant="h6">II.Compare data of your Saved Albums</Typography>
    </div>
      <Grid container style={{backgroundColor:'black'}} spacing={8}>
        <Grid item xs={8} style={{backgroundColor:'black', margin:'auto'}}>
        <Paper elevation={10} className={classes.root} style={{backgroundColor:'#333333'}}>
        <Card className={classes.root} style={{backgroundColor:'#333333'}}>
          <CardContent >
            <div className="canvas-container">
            <Bar   backgroundColor="#333333"
          data={chartData1}
          options={{
            title:{
              display:true,
              text:'Saved Albums: Popularity',
              fontSize:20
            },
            legend:{
              display:true,
              position:'right'
            }
          }}
        /> 
            </div>
          
          </CardContent>
          </Card>
          </Paper>
          </Grid>
        <Grid item xs={8} style={{backgroundColor:'black',margin:'auto'}}>
        <Paper elevation={10} className={classes.root} style={{backgroundColor:'#333333'}}>
        <Card className={classes.root} style={{backgroundColor:'#333333'}}>
          <CardContent >
            <div className="canvas-container" style={{width:'100%', height:'80%'}}>
            <Bar   backgroundColor="#333333"
          data={chartData2}
          options={{
            responsive:true,
            title:{
              display:true,
              text:'Saved Albums: Total Tracks',
              fontSize:20
            },
            legend:{
              display:true,
              position:'right'
            }
          }}/> 
            </div>
          
          </CardContent>
          </Card>
          </Paper>
          </Grid>
          </Grid> 
          </ThemeProvider>     
  </div>):
  <CircularProgress color='white'/>
}   
 </div>
  );
}

export default Albums;