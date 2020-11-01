import React, { useEffect, useState } from 'react';
import axios from 'axios'
import './App.css';
import './Homepage.css';
import {Bar, defaults } from 'react-chartjs-2';
import { Typography, CircularProgress, Paper, Card, Grid, CardContent, Avatar} from '@material-ui/core';
import { fade, makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const state = {
    labels: ['January', 'February', 'March',
             'April', 'May'],
    datasets: [
      {
        label: 'Rainfall',
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: [65, 59, 80, 81, 56]
      }
    ]
  }
const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});
const useStyles = makeStyles((darkTheme) => ({
  root: {
    width: '100%',
    maxWidth: 800,
    backgroundColor: darkTheme.palette.background.paper,
    margin: "auto",
    backgroundColor:'black'
  }
  
}));

function Homepage () {
  const _token = window.location.hash;
  //console.log(_token);

  const [token, setToken] = useState(sessionStorage.getItem('token'));
  const [userData, setUserData] = useState();
  //console.log(userData);
  //console.log("token is " + token);
  const [artistData, setArtistData] = useState([]);
  let artists;  
  const classes = useStyles();
  const userEndpointUrl = 'https://api.spotify.com/v1/me';
  const artistEndpointUrl = 'https://api.spotify.com/v1/me/following?type=artist&limit=10';
  const [chartData, setChartData] = useState();
  var colorArray = ['rgba(250, 130, 62, 0.8)', 'rgba(15, 76, 129, 0.8)', 'rgba(254,74,73,0.8)', 'rgba(42,183,202,0.8)', 'rgba(254,215,102,0.8)', 'rgba(246,171,182, 0.8)', 'rgba(190,155,123,0.8)', 'rgba(99,172,229,0.8)'];
  const getTokenFromUrl = ()=> {
        console.log(token);
        var res = _token.split("&");
        res = res[0] + '=';
        res = res.split("=");
        console.log(res[1]);
        setToken(res[1]);
        sessionStorage.setItem('token', token);
        console.log(token);
        window.location.hash = "";
  };
  
  
  const fetchUserDataHandler = async () => {
        return axios(userEndpointUrl,{
          method:'GET',
          headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + `${token}`,
          }
        })
        .then((response)=>{
          //console.log(response)
          setUserData(response)
          //console.log(userData)
        })
        .catch(error=>
          console.log(""));
        
      };
      const fetchArtistDataHandler = async () => {
      return axios(artistEndpointUrl,{
        method:'GET',
        headers:{
          'Accept':'application/json',
          'Content-Type':'application/json',
          'Authorization': 'Bearer ' + `${token}`,
        },
      })
      .then((response)=>{
        console.log(response.data.artists.items);
        setArtistData(response.data.artists.items);
        //artists = response.data.artists.items;
        console.log(artistData);
      })
      .catch(error=>{
        console.log(error);
        //console.log('this is the token1:'+ token);
      });
      
    };
    const artistLabel = artistData.map(item=>{
      return( item.name ) })
    const artistPopularity = artistData.map(item=>{
      return( item.popularity )  })

    //console.log(artistLabel);
    //console.log(artistPopularity);
    const chartData1 = {
       labels: artistLabel,
       datasets: [
                {
                 label: 'Artist',
                 backgroundColor: colorArray.sort(function() {return 0.5 - Math.random()}),
                 borderColor: 'rgba(0,0,0,1)',
                 borderWidth: 2,
                 data: artistPopularity
                 }
                 ]
              }
    useEffect(() => {
      getTokenFromUrl();
      //const _token = getTokenFromUrl();
      /*if(_token){
        setToken(_token);
        console.log( `_token is ${_token}`);
        console.log(`token for homepage is ${token}`);
         }
         fetchUserDataHandler();
         fetchArtistDataHandler();*/
         setChartData(chartData1);
         
  }, [_token]);

   if(token){
    fetchUserDataHandler();
    fetchArtistDataHandler();
    //console.log('this is the token2:'+ token);
  }
   
   
   console.log(`Data is : ${chartData}`);

  return (<div className="home_content">
    { userData? (<div style={{verticalAlign: 'middle'}}>
    <div style={{display:'flex', flexDirection:'row', justifyContent:'center',alignItems:'center'}}><Avatar style={{verticalAlign:'bottom'}} alt={userData.data.display_name} src={userData.data.images[0].url}/><Typography variant="h6">Welcome back, {userData.data.display_name}!</Typography></div>
    <div className={classes.root} style={{justifyContent:"space-between"}}>
    <ThemeProvider theme={darkTheme}>
    <div style={{backgroundColor:"black", color:"white", marginLeft: 10}}><Typography variant="h6">Compare data from all your saved music side by side:</Typography>
    <Typography variant="body2">I. Artists you follow: Popularity</Typography></div>
      <Grid container style={{backgroundColor:'black', marginTop: 16}}>
        <Grid item xs={12} style={{backgroundColor:'black', margin:'auto'}}>
        <Paper elevation={10} className={classes.root} style={{backgroundColor:'#333333'}}>
        <Card className={classes.root} style={{backgroundColor:'#333333'}}>
          <CardContent className="canvasCardContainer">
            <div className="canvas-container-homepage">
            <Bar  backgroundColor="#333333"
            data={chartData1}
            options={{
              title:{
              display:true,
              text:'Popularity',
              fontSize:20
            },
            legend:{
              fontSize: 20,
              display:true,
              position:'top'
            }
          }}/> 
            </div>
          
          </CardContent>
          </Card>
          </Paper>
          </Grid>
          </Grid> 
          </ThemeProvider>     
  </div>
  </div>):
  <CircularProgress color='white'/>
}</div>
);
}

export default Homepage;
