

import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Home from './home'

export default () => (
  <Switch>
    <Route exact path="/" render={() => <Redirect to="/home" />} />
    <Route path="/home" component={Home} />
  </Switch>
)
