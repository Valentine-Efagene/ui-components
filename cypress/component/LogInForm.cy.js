import LogInForm from '../../src/components/LogInForm'

describe('Log in component', () => {
  it('should be visible', () => {
    const testId = 'LogInForm'
    cy.mount(<LogInForm />)
    cy.get(`[testId="${testId}"]`).should('be.visible')
  })
})
