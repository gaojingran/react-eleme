
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { AppContainer } from 'react-hot-loader'
import App from './pages'

// requires and returns all modules that match
const requireAll = requireContext => requireContext.keys().map(requireContext)
// import all svg
const reqSvg = require.context('./assets/svg', true, /\.svg$/)
requireAll(reqSvg)

const render = Component => (
  ReactDOM.render((
    <AppContainer>
      <BrowserRouter>
        <Component />
      </BrowserRouter>
    </AppContainer>
  ), document.getElementById('root'))
)

render(App)

if (module.hot) {
  module.hot.accept('./pages', () => {
    render(App)
  })
}
