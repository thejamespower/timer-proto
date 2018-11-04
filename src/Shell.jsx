import React from 'react'
import { Provider } from 'react-redux'

import store from './store'
import App from './container'

const Shell = () => (
  <Provider store={store}>
    <App />
  </Provider>
)

export default Shell
