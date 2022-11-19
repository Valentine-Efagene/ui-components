import Table from '../../src/components/Table'

describe('<Table/>', () => {
  it('should be visible', () => {
    const body = [
      { id: 0, name: 'Jane Doe', email: 'janedoe@email.com', age: 25 },
      { id: 1, name: 'John Doe', email: 'johndoe@email.com', age: 26 },
      { id: 1, name: 'Sam Jones', email: 'samjones@email.com', age: 26 },
    ]

    const columnHeadings = ['ID', 'Name', 'Email', 'Age']

    const data = {
      headings: columnHeadings,
      body,
      indexColumn: 'email',
    }

    cy.mount(<Table testId={'table'} data={data} />)
    cy.get('[test-id="table"]')
  })
})
