import { Provider } from 'react-redux'
import RtkQueryTest from '../../src/components/RtkQueryTest'
import { store } from '../../src/redux/store'

describe('<RtkQueryTest/>', () => {
  it('should mount', () => {
    cy.mount(
      <Provider store={store}>
        <RtkQueryTest />
      </Provider>
    )
  })
})
