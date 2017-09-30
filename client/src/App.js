import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import axios from 'axios'
import Select from 'react-select';
import 'react-select/dist/react-select.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pokemon: [],
      selectedOption: null,
    }
  }

  getPokemonList() {
    axios.get(`${process.env.REACT_APP_API_URL}/api/pokemon`)
    .then((res) => { 
      this.setState({pokemon: res.data.data})
    })
    .catch((err) => { 
      console.log(err)
    })
  }

  componentDidMount() {
    this.getPokemonList()
  }

  logChange(value) {
    this.setState({selectedOption: value})
  }

  render() {
    return (
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="col-md-6">
            <h1 style={{ marginTop: 80 }}>Select pokémon</h1>
            <Select
              multi={ true }
              value={ this.state.selectedOption }
              options={
                this.state.pokemon.map(pokemon => {
                  return {
                    value: pokemon.id,
                    label: `${pokemon.forme}`
                    }
                })
              }
              onChange={this.logChange.bind(this)}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
