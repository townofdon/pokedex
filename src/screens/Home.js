import React, { Component } from 'react'
import Pokemon from '../components/pokemon'
import PokemonSingle from '../components/single-pokemon';
import Search from '../components/search'
import { getPokemons } from '../services/pokemonService'
import { filterPokemons, setPokemons } from '../utils/pokemonUtils'

class Page extends Component {
  constructor(props) {
    super(props);
    this.setPokemonDetails = this.setPokemonDetails.bind(this);
    this.setIsExpanded = this.setIsExpanded.bind(this);
  }
  state = {
    isFetched: false,
    error: null,
    pokemons: [],
    displayedPokemons: [],
    pokemonDetails: null,
    isExpanded: false,
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    try {
      const { results } = await getPokemons()
      this.setState({
        isFetched: true,
        pokemons: setPokemons(results),
        displayedPokemons: filterPokemons('', results)
      })
    } catch (error) {
      this.setState({ error: error.message })
    }
  }

  handleSearch = event => {
    const searchString = event.nativeEvent.target.value
    this.setState(({ pokemons }) => ({
      displayedPokemons: filterPokemons(searchString, pokemons)
    }))
  }

  setPokemonDetails(pokemonDetails) {
    this.setState({
      pokemonDetails,
    });
  }

  setIsExpanded(isExpanded) {
    console.log(isExpanded);
    this.setState({
      isExpanded,
    })
  }

  render() {
    let { displayedPokemons, pokemonDetails, isFetched, isExpanded, error } = this.state

    let pokemons = displayedPokemons.map((pokemon, index) => {
      return (
        <li className="pokemons__item" key={pokemon.id}>
          <Pokemon
            pokemon={pokemon}
            setPokemonDetails={this.setPokemonDetails}
            isExpanded={isExpanded}
            setIsExpanded={this.setIsExpanded}
          />
        </li>
      )
    })

    return (
      <div className="page">
        {error && <div className="page__error">{error}</div>}
        <div className="page__search">
          <Search onChange={this.handleSearch} />
        </div>
        {isFetched ? (
          <ul className="pokemons">{pokemons}</ul>
        ) : (
          <p>Loading...</p>
        )}
        <div>
          {isFetched ? (
            <PokemonSingle
              pokemonDetails={pokemonDetails}
              setPokemonDetails={this.setPokemonDetails}
              isExpanded={isExpanded}
              setIsExpanded={this.setIsExpanded}
            />
          ) : (
            <h2>test</h2>
          )}
        </div>
      </div>
    )
  }
}

export default Page
