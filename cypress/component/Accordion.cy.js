import Accordion from '../../src/components/Accordion'

describe('<Accordion/>', () => {
  it('should be visible', () => {
    const information = [
      {
        heading: 'How to boil an egg',
        content:
          'Elit est irure labore magna laboris mollit cupidatat. Adipisicing enim id irure sunt enim consectetur esse sunt nisi id exercitation esse ad labore. Deserunt laboris do sint minim. Sit nulla sint tempor velit do veniam eiusmod fugiat officia incididunt.',
      },
      {
        heading: 'How to boil an egg',
        content:
          'Elit est irure labore magna laboris mollit cupidatat. Adipisicing enim id irure sunt enim consectetur esse sunt nisi id exercitation esse ad labore. Deserunt laboris do sint minim. Sit nulla sint tempor velit do veniam eiusmod fugiat officia incididunt.',
      },
      {
        heading: 'How to boil an egg',
        content:
          'Elit est irure labore magna laboris mollit cupidatat. Adipisicing enim id irure sunt enim consectetur esse sunt nisi id exercitation esse ad labore. Deserunt laboris do sint minim. Sit nulla sint tempor velit do veniam eiusmod fugiat officia incididunt.',
      },
    ]
    cy.mount(<Accordion style={{ width: '100%' }} information={information} />)
    cy.get('[testid="accordion"]').should('be.visible')
  })
})
