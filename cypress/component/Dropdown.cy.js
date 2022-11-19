import Dropdown from '../../src/components/Dropdown'

describe('Dropdown.cy.js', () => {
  beforeEach(() => {
    cy.log('Mounting...')
    const menuItemStyle = { padding: '12px', display: 'block' }
    cy.mount(<Dropdown value="test" />)
  })

  it('should be visible', () => {
    cy.get('[testid="dropdown_toggle"]').should('be.visible')
  })

  it('should open and close on toggle', () => {
    cy.get('[testid="dropdown_toggle"]').click()
    cy.get('[testid="dropdown_content"]').should('be.visible')
    cy.get('[testid="dropdown_toggle"]').click()
    cy.get('[testid="dropdown_content"]').should('not.be.visible')
  })
})
