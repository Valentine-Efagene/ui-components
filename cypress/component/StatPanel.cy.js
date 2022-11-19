import StatPanel from '../../src/components/StatPanel'

describe('StatCard', () => {
  it('should be visible', () => {
    const testId = 'test'
    const stats = [
      {
        title: 'Notifications',
        value: 28,
      },
      {
        title: 'Read',
        value: 14,
      },
      {
        title: 'Unread',
        value: 18,
      },
    ]
    cy.mount(<StatPanel testid={'test'} stats={stats} />)
    cy.get(`[testid="${testId}"]`).should('be.visible')
  })
})
