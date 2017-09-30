import React, { Component } from 'react';
import axios from 'axios';
import Select from 'react-select';
import { Route, Switch } from 'react-router-dom'
import 'react-select/dist/react-select.css';
import './App.css';
import About from './components/About';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemon: [],
      selectedOption: null,
      loadingPokemon: true,
    };
  }

  componentDidMount() {
    this.getPokemonList();
  }

  getPokemonList() {
    axios.get(`${process.env.REACT_APP_API_URL}/api/pokemon`)
      .then((res) => {
        this.setState({ pokemon: res.data.data, loadingPokemon: false });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className="container" style={{ marginTop: 80 }}>
        <Switch>
          <Route 
            exact 
            path="/" 
            render={() => (
              <div className="row justify-content-center">
                <div className="col-md-6">
                  <h1>Select pokémon</h1>
                  <Select
                    multi
                    value={this.state.selectedOption}
                    isLoading={this.state.loadingPokemon}
                    options={
                      this.state.pokemon.map(pokemon =>
                        ({
                          value: pokemon.id,
                          label: `${pokemon.forme}`,
                        }),
                      )
                    }
                    onChange={value => this.setState({ selectedOption: value })}
                  />                  
                  <div className="row justify-content-center">
                    <button className="btn btn-secondary" style={{ marginTop: 20 }}>compare</button>
                  </div>
                </div>
              </div>
            )}
          />

          <Route exact path="/about" component={About} />
        </Switch>
      </div>
    );
  }
}

export default App;
