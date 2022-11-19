import {
  pokemonApi,
  // useGetPokemonByNameQuery,
} from '../../redux/services/pokemon'

function RtkQueryTest() {
  // Using a query hook automatically fetches data and returns query values
  // const { data, error, isLoading } = useGetPokemonByNameQuery('bulbasaur')
  // Individual hooks are also accessible under the generated endpoints:
  const {
    data: pokemon,
    error,
    isLoading,
  } = pokemonApi.endpoints.getPokemonByName.useQuery('bulbasaur')
  console.log(pokemon)
  console.log(error)
  console.log(isLoading)

  return isLoading ? 'Loading...' : <div>{pokemon?.name}</div>
}

export default RtkQueryTest
