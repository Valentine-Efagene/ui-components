import { useEffect } from 'react'
import { useState } from 'react'
import DragAndDropFileInput from '../../src/components/DragAndDropFileInput'

describe('<DragAndDropFileInput/>', () => {
  it('should mount', () => {
    cy.mount(<DragAndDropFileInput setState={() => {}} />)
    cy.get('[test-id="drag_and_drop_file_input"]').should('be.visible')
  })

  it('should update state of parent', () => {
    const Tester = () => {
      const [state, setState] = useState([])

      useEffect(() => {
        console.log('From test:', [...state])
      }, [state])

      return (
        <div test-id="test">
          <DragAndDropFileInput setState={setState} />
        </div>
      )
    }

    cy.mount(<Tester />)
    cy.get('[test-id="test"]').should('be.visible')
  })
})
