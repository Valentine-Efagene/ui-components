import TextField from '../../src/components/TextField'

describe('<TextField>', () => {
  it('should accept a text input', () => {
    cy.mount(<TextField />)
    const TEST_TEXT = 'Hello, World!'
    cy.get('[testid="text_field"]').type(TEST_TEXT)
    cy.get('[testid="text_field"]').should('have.value', TEST_TEXT)
  })

  it('should not have a value longer than 50 characters', () => {
    cy.mount(<TextField />)
    cy.get('[testid="text_field"]').type(
      'Tempor reprehenderit nisi fugiat exercitation nostrud laboris minim ipsum.',
      { delay: 0 }
    )
    cy.get('[testid="text_field"]').should('not.have.length.above', 50)
  })

  it('should catch excessive length error', () => {
    cy.mount(<TextField type={'email'} maxLength={5} />)
    cy.get('[testid="text_field"]').type(
      'Tempor reprehenderit nisi fugiat exercitation nostrud laboris minim ipsum.',
      { delay: 0 }
    )
    cy.get('[testid="text_field"]').its('validity').should('deep.equal', {
      valueMissing: false,
      typeMismatch: false,
      patternMismatch: false,
      tooLong: false,
      tooShort: false,
      rangeUnderflow: false,
      rangeOverflow: false,
      stepMismatch: false,
      badInput: false,
      customError: false,
      valid: false,
    })
  })
})
