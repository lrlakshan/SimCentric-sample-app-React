import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import Canvas from "./containers/Canvas";
class App extends Component{
  //Defining initial state
  state ={
      data : null
  }

  //Making the API call and once resolved updating the state
  componentDidMount(){
      
}


  render(){
    return(
      <div>
          {/* <h1>wooooow</h1> */}
          <Canvas />
      </div>
    )
  }
}

export default App;
