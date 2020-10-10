import React, { useEffect, useState } from 'react';
import axios from 'axios'
import './App.css';
import './Homepage.css';
import {Bar} from 'react-chartjs-2';
import { CircularProgress, Paper, Avatar, Typography, List, ListItem, Divider, ListItemText, ListItemAvatar} from '@material-ui/core';
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
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 800,
    backgroundColor: theme.palette.background.paper,
    margin: "auto"
  },
  inline: {
    display: 'inline',
  },
  listItemLayout: {
    display: 'flex',
    justify: 'space-between',
    alignItems: 'center',
    verticalAlign:'middle',
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
  },
  large: {
    width: theme.spacing(18),
    height: theme.spacing(18),
    verticalAlign: "middle"
  },
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
  const artistEndpointUrl = 'https://api.spotify.com/v1/me/following?type=artist';
  const [chartData, setChartData] = useState();
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
                 label: 'Artists you follow: Popularity',
                 backgroundColor: 'rgba(29,185,84,0.8)',
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

  return (<div>
    { userData? (<div className="home_content">
    <h1>Welcome back, {userData.data.display_name}!</h1>
    <br/>
    <Avatar alt={userData.data.display_name} src={userData.data.images[0].url} className={classes.large} style={{margin: "auto"}}/>
    <div className={classes.root} style={{justifyContent:"space-between"}}>
    
    <div>
      <Bar backgroundColor="#383838"
          data={chartData1}
          options={{
            title:{
              display:true,
              text:'Artists Popularity',
              fontSize:20
            },
            legend:{
              display:true,
              position:'right'
            }
          }}
        /> 
          
    </div>
 
  </div>
  </div>):
  <CircularProgress color="white"/>
}</div>
);
}

export default Homepage;
