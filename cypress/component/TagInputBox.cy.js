import TagInputBox from '../../src/components/TagInputBox'

describe('TagInputBox', () => {
  it('should be visible', () => {
    const testId = 'test'
    cy.mount(<TagInputBox testId={testId} />)
    cy.get(`[testid="${testId}"]`).should('be.visible')
  })
})
