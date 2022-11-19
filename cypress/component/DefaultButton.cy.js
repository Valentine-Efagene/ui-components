import DefaultButton from '../../src/components/DefaultButton'

describe('<DefaultButton/>', () => {
  it('should display', () => {
    cy.mount(
      <DefaultButton
        onClick={() => {
          alert('hello')
        }}>
        Test
      </DefaultButton>
    )
  })
})
