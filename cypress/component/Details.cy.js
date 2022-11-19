import Details from '../../src/components/Details'

describe('<Details/>', () => {
  it('should mount', () => {
    cy.mount(<Details />)
  })

  it('should display', () => {
    cy.mount(<Details />)
    cy.get('[testid="details"]').should('be.visible')
  })

  it('should toggle open', () => {
    cy.mount(
      <Details
        heading="How to boil an egg"
        content="Ex voluptate sunt cupidatat cupidatat excepteur ut eiusmod aliquip est laborum ipsum excepteur officia. Ut aliquip ipsum aute consectetur reprehenderit quis pariatur non voluptate esse ut voluptate. Cupidatat nulla quis ad culpa id ullamco esse consequat veniam. Nisi magna aliquip qui aliquip eiusmod cupidatat velit veniam quis fugiat voluptate."
      />
    )
    cy.get('[testid="summary"]').click()
    cy.get('[testid="content"]').should('be.visible')
  })
})
