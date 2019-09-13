
import React from 'react';

// This function takes a component...
export default function withPokeData(WrappedComponent) {
  // ...and returns another component...
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        pokemonDetails: null,
        isExpanded: false,
      };
      this.setPokemonDetails = this.setPokemonDetails.bind(this);
      this.setIsExpanded = this.setIsExpanded.bind(this);
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
      const { isExpanded, pokemonDetails } = this.state;
      // ... and renders the wrapped component with the fresh data!
      // Notice that we pass through any additional props
      return (
        <WrappedComponent
          {...this.props}
          pokemonDetails={pokemonDetails}
          setPokemonDetails={this.setPokemonDetails}
          isExpanded={isExpanded}
          setIsExpanded={this.setIsExpanded}
        />
      );
    }
  };
}
