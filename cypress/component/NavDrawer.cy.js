import NavDrawer from '../../src/components/NavDrawer'

describe('<NavDrawer/>', () => {
  const links = [
    { name: 'Home', url: '/home' },
    {
      name: 'Sales',
      url: null,
      children: [
        { name: 'sales records', url: '/records' },
        { name: 'sales analytics', url: '/analytics' },
      ],
    },
    { name: 'About', url: '/about' },
    {
      name: 'Purchases',
      url: null,
      children: [{ name: 'sales records', url: '/records' }],
    },
  ]

  it('should be visible', () => {
    cy.mount(<NavDrawer testId={'nav'} links={links} />)
    cy.get('[test-id="nav"]').should('be.visible')
  })
})
