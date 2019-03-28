export const getPokemons = () =>
  fetch(`https://pokeapi.co/api/v2/pokemon/?limit=784`).then(response => {
    if (response.ok) {
      return response.json()
    }

    throw new Error(`${response.status}: ${response.statusText}`)
  })
