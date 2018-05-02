

import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Switch, Route, Redirect } from 'react-router-dom'
import asyncLoad from 'components/async-loade'
import science from 'assets/img/science.svg'
import { getUserInfo } from '../api'
import { globalUpdate } from '../stores/global'
import styles from './index.less'

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

const Loading = () => (
  <div className={styles.loading}>
    <div className={styles.icon}>
      <img src={science} />
    </div>
  </div>
)

export default () => (
  <React.Fragment>
    <AuthComponent />
    <Switch>
      <Route exact path="/" render={() => <Redirect to="/home" />} />
      <Route path="/home" component={asyncLoad(() => import('./home'), <Loading />)} />
      <Route path="/order" component={asyncLoad(() => import('./order'), <Loading />)} />
      <Route path="/profile" component={asyncLoad(() => import('./profile'), <Loading />)} />
      <Route path="/login" component={asyncLoad(() => import('./login'), <Loading />)} />
      <Route path="/shop-detail" component={asyncLoad(() => import('./shop-detail'), <Loading />)} />
      <Route path="/address" component={asyncLoad(() => import('./address'), <Loading />)} />
    </Switch>
  </React.Fragment>
)

