import React from 'react'

const PokemonSingle = ({
  pokemonDetails,
  isExpanded,
  setIsExpanded,
}) => {
  const className = `pokemon__info ${isExpanded ? 'expanded' : ''}`;
  const _handlePokeClose = (ev) => {
    ev.preventDefault();
    setIsExpanded(false);
  }
  return (
    <div className={className}>
      <div className="x-close" onClick={_handlePokeClose}>x</div>
      <div className="container">
        {pokemonDetails && (
          <h2>
            {pokemonDetails.name}
          </h2>
        )}
        <h3>Abilities:</h3>
        {(pokemonDetails && pokemonDetails.abilities) ? (
          pokemonDetails.abilities.map((ability, index) => (
            <p key={index}>
              {/* For some reason this is how the API data was structured */}
              {ability.ability.name}
            </p>
          ))
        ) : null}
      </div>
    </div>
  );
};


export default PokemonSingle;
