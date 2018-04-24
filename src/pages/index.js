

import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Switch, Route, Redirect } from 'react-router-dom'
import asyncLoad from 'components/async-loade'
import { getUserInfo } from '../api'
import { globalUpdate } from '../stores/global'

@connect(() => ({}), dispatch => bindActionCreators({
  globalUpdate,
}, dispatch))
class AuthComponent extends React.Component {
  async componentDidMount() {
    try {
      const { data } = await getUserInfo()
      this.props.globalUpdate({
        isLogin: true,
        userInfo: data,
      })
    } catch (err) {
      this.props.globalUpdate({
        globalUpdate: false,
        userInfo: {},
      })
    }
  }

  render() {
    return null
  }
}

export default () => (
  <React.Fragment>
    <AuthComponent />
    <Switch>
      <Route exact path="/" render={() => <Redirect to="/home" />} />
      <Route path="/home" component={asyncLoad(() => import('./home'))} />
      <Route path="/profile" component={asyncLoad(() => import('./profile'))} />
      <Route path="/login" component={asyncLoad(() => import('./login'))} />
    </Switch>
  </React.Fragment>
)

