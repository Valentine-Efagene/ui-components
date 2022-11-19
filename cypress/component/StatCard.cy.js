import StatCard from '../../src/components/StatCard'

describe('StatCard', () => {
  it('should be visible', () => {
    const testId = 'test'
    cy.mount(<StatCard testid={'test'} title="Notifications" value={28} />)
    cy.get(`[testid="${testId}"]`).should('be.visible')
  })
})
