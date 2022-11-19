import NetworkMonitor from '../../src/components/NetworkMonitor'

describe('<NetworkMonitor/>', () => {
  it('mounts', () => {
    cy.mount(<NetworkMonitor />)
    cy.get('[testid="network_monitor"]').should('not.be.null')
  })
})
