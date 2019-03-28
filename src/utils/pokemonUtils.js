export const filterPokemons = (searchString = '', pokemons) =>
  pokemons.filter(pokemon => {
    return pokemon.name.toLowerCase().includes(searchString.toLowerCase())
  })

export const setPokemons = data =>
  data.map(pokemon => {
    let { url } = pokemon
    pokemon.id = url.substring(34, url.length - 1)
    pokemon.name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)
    return pokemon
  })
