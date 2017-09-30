import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemon: []
    }
  }

  getPokemonList() {
    axios.get(`${process.env.REACT_APP_API_URL}/api/pokemon`)
    .then((res) => { 
      this.setState({pokemon: res.data.data}); 
    })
    .catch((err) => { 
      console.log(err); 
    })
  }

  componentDidMount() {
    this.getPokemonList()
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          {
            this.state.pokemon.map((pokemon) => {
              return <p>{ pokemon.name }</p>
            })
          }
        </p>
      </div>
    );
  }
}

export default App;
