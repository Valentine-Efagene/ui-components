import React from 'react'
import DoughnutChart from '../../src/components/DoughnutChart'

describe('<DoughnutChart/>', () => {
  it('is visible', () => {
    const data = [
      {
        symbol: 'Community Liquidity Providers = 1,200,000,000 (40%)',
        percent: 40,
        color: '#F4DAA9',
      },
      {
        symbol: 'Pre-Sale Liquidity Providers = 750,000,000 (25%)',
        percent: 25,
        color: '#A4B5F8',
      },
      {
        symbol: 'Reserve Holdings / Treasury = 150,000,000 (5%)',
        percent: 5,
        color: '#E89AAD',
      },
      {
        symbol: 'Long-Term Compensation = 150,000,000 (5%)',
        percent: 5,
        color: '#29EBF3',
      },
    ]
    cy.mount(
      <DoughnutChart
        data={data}
        innerRadius={50}
        outerRadius={90}
        increment={10}
        width={200}
      />
    )
    cy.get('[testid="doughnut"]').should('be.visible')
  })
})
