import React, { Component } from 'react'

class Pokemon extends Component {
  constructor(props) {
    super(props);
    this._handlePokeClick = this._handlePokeClick.bind(this);
    this._fetchDataAndSet = this._fetchDataAndSet.bind(this);
  }

  async _fetchDataAndSet() {
    const { pokemon, setPokemonDetails } = this.props;
    if (!pokemon) {
      return;
    }
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.id}/`);
      const json = await res.json();
      setPokemonDetails(json);
    } catch (err) {
      console.error(JSON.stringify(err));
    }
  }

  _handlePokeClick(ev) {
    const { isExpanded, setIsExpanded } = this.props;
    ev.preventDefault();
    if (!isExpanded) {
      this._fetchDataAndSet();
      setIsExpanded(true);
    } else {
      setIsExpanded(false);
    }
  }

  render() {
    const { pokemon } = this.props
    if (!pokemon) {
      return null;
    }
    return (
      <div className="pokemon">
        <button
          onClick={this._handlePokeClick}
          type="button"
          className="pokemon__sprite"
          style={{
            backgroundImage: `url(${`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
              pokemon.id
            }.png`})`
          }}
        />
        <p className="pokemon__name">{pokemon.name}</p>
      </div>
    )
  }
}

export default Pokemon;
