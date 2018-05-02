

import React from 'react'
import { connect } from 'react-redux'
import Toast from 'components/toast'
import NavBar from '../common-components/nav-bar'
import AuthError from '../common-components/auth-err'
import { delAddress } from '../../api'
import styles from './index.less'

@connect(({ globalState }) => ({
  isLogin: globalState.isLogin,
}))
export default class AddressEdit extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      info: props.location.state,
    }
  }

  handleDelete = async () => {
    const { info } = this.state
    if (info && info.id) {
      try {
        Toast.loading('请稍后...', 0)
        const { data } = await delAddress({ id: info.id })
        Toast.hide()
        data && this.props.history.goBack() // eslint-disable-line
      } catch ({ err }) {
        Toast.info(err)
      }
    }
  }

  render() {
    const { isLogin } = this.props
    const { info } = this.state
    const navText = info ? '编辑地址' : '更新地址'
    const navProps = info ? {
      iconRight: '#delete',
      rightClick: this.handleDelete,
    } : {}

    return !isLogin ? <AuthError /> : (
      <div className={styles.address}>
        <NavBar
          title={navText}
          iconLeft="#back"
          leftClick={() => this.props.history.goBack()}
          {...navProps} />
        address
      </div>
    )
  }
}
