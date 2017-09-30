import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import axios from 'axios'
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import 'react-select/dist/react-select.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pokemon: [],
      selectedOption: null,
      loadingPokemon: true,
    }
  }

  getPokemonList() {
    axios.get(`${process.env.REACT_APP_API_URL}/api/pokemon`)
    .then((res) => { 
      this.setState({pokemon: res.data.data, loadingPokemon: false})
    })
    .catch((err) => { 
      console.log(err)
    })
  }

  componentDidMount() {
    this.getPokemonList()
  }

  render() {
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <h1 style={{ marginTop: 80 }}>Select pokémon</h1>
            <Select
              multi={ true }
              value={ this.state.selectedOption }
              isLoading={this.state.loadingPokemon}
              options={
                this.state.pokemon.map(pokemon => {
                  return {
                    value: pokemon.id,
                    label: `${pokemon.forme}`
                    }
                })
              }
              onChange={value => this.setState({selectedOption: value})}
            />
          </div>
        </div>
        <div className="row justify-content-center">
            <button className="btn btn-secondary" style={{ marginTop: 20 }}>compare</button>
        </div>
      </div>
    );
  }
}

export default App;
