import CurveGraph from '../../src/components/CurveGraph'

describe('<CurveGraph/>', () => {
  it('should mount and display', () => {
    cy.mount(<CurveGraph width={700} height={200} />)
    cy.get('[test-id="curve_graph"]').should('be.visible')
  })
})
