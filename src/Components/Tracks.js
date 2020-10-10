import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import './Tracks.css';
import { Accordion, CircularProgress, Paper, Avatar, Typography, Grid, Card, CardContent, CardActionArea} from '@material-ui/core';
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

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

function Tracks() {
  //const _token = getTokenFromUrl();
  //console.log(_token);
  const [token, setToken] = useState(sessionStorage.getItem('token'));
  //console.log("token is " + token);
  const [tracksData, setTracksData] = useState([]);
  const [audioFeature1, setAudioFeature1] = useState();
  const classes = useStyles();
  const trackEndpointUrl = 'https://api.spotify.com/v1/me/tracks?offset=1&limit=5';
  const fetchTrackDataHandler = async () => {
    return axios(trackEndpointUrl,{
      method:'GET',
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + `${token}`,
      }
    })
    .then((response)=>{
      console.log(response.data.items)
      setTracksData(response.data.items)
    })
    .catch(error=>
      console.log(error));
  };
  const trackID = tracksData.map(item=>{
    return( item.track.id ) })
    console.log(trackID)
    const id1=trackID[0];
  const endpoint2 = `https://api.spotify.com/v1/audio-features/${id1}`;
  const endpoint1 = 'https://api.spotify.com/v1/audio-features/11dFghVXANMlKmJXsNCbNl';
  console.log(endpoint2)

  const fetchAudioFeatures1 = async () => {
    return axios(endpoint1,{
      method:'GET',
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + `${token}`,
      }
    })
    .then((response)=>{
      console.log(response)
      setAudioFeature1(response)
    })
    .catch(error=>
      console.log(error));
  };
  const keyNames = Object.keys(audioFeature1)
console.log(keyNames)

  useEffect(() => {
    fetchTrackDataHandler();
    fetchAudioFeatures1();
  }, []);

  
  

  return (<div>
             <div className="tracks_content">
             <h1>Tracks</h1>
             <h2>Click on the track to view corresponding track audio features analysis</h2>
             <Grid container direction='row' justify='center' alignItems='center' spacing = {6}>
       {tracksData? (
           <div>
           {tracksData.map(item => {
             return (
              <div className="tracks_content--element">
               <Grid item sm = {8}>
               <ThemeProvider theme={darkTheme}>
                 <Paper className= {classes.paper} elevation={15} style={{backgroundColor:'#383838', color:'white'}}>
                 <Card  className={classes.root} style={{backgroundColor:'#383838', color:'white'}}>
                  <CardActionArea>
                  <img className="coverImage" src={item.track.album.images[1].url} style={{borderRadius:'5px', padding:'5px', height:300, width:300}}/>
                   <CardContent>
                   <Typography variant="h6"  style={{ cursor: 'pointer' }}>
                    {item.track.name}
                   </Typography>
                   <Typography variant="subtitle2"  color='textSecondary'>
                    {item.track.artists[0].name}<br/>
                    {item.track.album.name}
                   </Typography>
                 </CardContent>
                  </CardActionArea>
                 </Card>
                 </Paper>
                 </ThemeProvider>
               </Grid>
               <Grid container direction='row' justify='center' alignItems='center' spacing={6}>
               <Grid item xs='auto' sm = {8}/>
               <Grid item xs='auto' sm = {8}/>
               </Grid>
               </div>
             )
             })}
         </div>):<CircularProgress color="white"/>}
       </Grid>
       </div>
           
    </div>
          
             );
}

export default Tracks;