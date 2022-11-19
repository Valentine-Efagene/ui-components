import React from 'react'
import BarChart from '../../src/components/BarChart'

describe('<BarChart/>', () => {
  it('is visible', () => {
    const data = [
      {
        symbol: 'Community Liquidity Providers = 1,200,000,000 (40%)',
        value: 40,
        color: '#F4DAA9',
      },
      {
        symbol: 'Pre-Sale Liquidity Providers = 750,000,000 (25%)',
        value: 25,
        color: '#A4B5F8',
      },
      {
        symbol: 'Reserve Holdings / Treasury = 150,000,000 (5%)',
        value: 5,
        color: '#E89AAD',
      },
      {
        symbol: 'Long-Term Compensation = 150,000,000 (5%)',
        value: 5,
        color: '#29EBF3',
      },
    ]
    cy.mount(<BarChart data={data} width={200} height={700} />)
    cy.get('[testid="bar_chart"]').should('be.visible')
  })
})

