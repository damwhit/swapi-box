import React, { Component } from 'react';
import './App.css';
import Scroll from '../Scroll/Scroll.js';
import Box from '../Box/Box.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Scroll />
        <Box />
      </div>
    );
  }
}

export default App;
