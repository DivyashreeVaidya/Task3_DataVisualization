import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import './Artists.css';
import { CircularProgress, Paper, Avatar, Typography, List, ListItem, Divider, ListItemText, ListItemAvatar, Grid, Card, CardContent, CardActionArea} from '@material-ui/core';
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import {Pie} from 'react-chartjs-2';

function PieArtist({followersData}) {

  console.log(followersData);

  const artistLabel = followersData.map(item=>{
    return( item.name ) })
    const artistFollowers = followersData.map(item=>{
    return( item.followers.total)  })

    console.log(artistFollowers);

    const data = {
     labels: artistLabel,
     datasets: [
      {
        label: 'Followers',
        data: artistFollowers,
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
        ]
      }
    ]
  }

  const options = {
    responsive:true,
    title:{
      display:true,
      text:'Artist Followers',
      fontSize:20
    },
    legend:{
      display:true,
      position:'right'
    }
  }

  return (
    <div>
      <Pie data={data} options={options} />
    </div>
  )
}

export default PieArtist
