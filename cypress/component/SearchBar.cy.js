import SearchBar from '../../src/components/SearchBar'

describe('<SearchBar/>', () => {
  it('should be visible', () => {
    const onSearch = () => {
      console.log('searching')
    }
    cy.mount(<SearchBar onSearch={onSearch} />)
    cy.mount('[test-id="search_bar"]')
  })
})
