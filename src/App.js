import React, { useEffect, useState } from 'react';
import './App.css';
import Homepage from './Components/Homepage';
import Navbar from './Components/Navbar';
import Albums from './Components/Albums';
import Artists from './Components/Artists';
import Login from './Components/Login';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {getTokenFromUrl} from './spotify';


function App() {
  const [token, setToken] = useState(sessionStorage.getItem('token'));
  useEffect(() => { 
  const _token = getTokenFromUrl()

  if(_token){
    setToken(_token);
    console.log(_token);
  }
},[]);
  return (
    <div className="App">
        {  token ? (<div className="homepage">
      <Router>
        <Navbar/>
        <Switch>
        <Route exact path="/home" component={Homepage}/>
        <Route path="/albums" component={Albums}/>
        <Route path="/artists" component={Artists}/>
        </Switch>
      </Router>
      </div>) :
      (<div className="container">
      <Login/>
      </div>) }
    </div>
  );
}

export default App;
