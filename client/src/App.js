import React, { Component } from 'react';
import axios from 'axios';
import Select from 'react-select';
import { Route, Switch, Link } from 'react-router-dom'
import './App.css';
import Home from './components/Home';
import About from './components/About';
import Comparison from './components/Comparison';


class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container" style={{ marginTop: 80 }}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={About} />
          <Route exact path="/compare/:ids" component={Comparison}/>
        </Switch>
      </div>
    );
  }
}

export default App;
