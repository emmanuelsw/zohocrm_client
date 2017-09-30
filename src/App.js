import React, { Component } from 'react';
import Navigation from './Navigation';
import Lead from './Lead';

class App extends Component {
  render() {
    return (
      <div>
        <Navigation/>
        <Lead/>
      </div>
    );
  }
}

export default App;
