import React, { Component } from 'react'
import Pokemon from '../components/pokemon'
import Search from '../components/search'
import { getPokemons } from '../services/pokemonService'
import { filterPokemons, setPokemons } from '../utils/pokemonUtils'

class Page extends Component {
  state = {
    isFetched: false,
    error: null,
    pokemons: [],
    displayedPokemons: []
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

  render() {
    let { displayedPokemons, isFetched, error } = this.state

    let pokemons = displayedPokemons.map(pokemon => {
      return (
        <li className="pokemons__item" key={pokemon.id}>
          <Pokemon pokemon={pokemon} />
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
      </div>
    )
  }
}

export default Page
