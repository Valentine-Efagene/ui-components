import BorderLabelTextField from '../../src/components/BorderLabelTextField/BorderLabelTextField'

describe('BorderLabelTextField', () => {
  it('should display', () => {
    const testId = 'test'
    cy.mount(
      <BorderLabelTextField
        labelText="First Name"
        placeholder="Enter name"
        testId={testId}
      />
    )
    cy.get(`[testId="${testId}"]`).should('be.visible')
  })
})
