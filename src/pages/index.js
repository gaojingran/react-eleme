

import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import asyncLoad from 'components/async-loade'

export default () => (
  <Switch>
    <Route exact path="/" render={() => <Redirect to="/home" />} />
    <Route path="/home" component={asyncLoad(() => import('./home'))} />
    <Route path="/profile" component={asyncLoad(() => import('./profile'))} />
    <Route path="/login" component={asyncLoad(() => import('./login'))} />
  </Switch>
)
