

import React from 'react'
import SvgIcon from 'components/icon-svg'
import Toast from 'components/toast'
import { mobileSendCode, loginByMobile } from '../../api'
import styles from './index.less'

export default class Login extends React.Component {
  state = {
    phone: '',
    code: '',
  }

  validate_token = undefined       // eslint-disable-line

  getCode = async () => {
    const { phone } = this.state
    if (!phone) return Toast.info('请填写手机号')
    try {
      const { data } = await mobileSendCode({
        mobile: phone,
        captcha_hash: '',
        captcha_value: '',
      })
      this.validate_token = data['validate_token']      // eslint-disable-line
    } catch ({ err }) {
      Toast.info(err)
    }
  }

  handleLogin = async () => {
    const { phone, code } = this.state
    if (!phone || !code) {
      return Toast.info('请填写手机号验证码')
    }
    try {
      Toast.loading('登录中...', 0)
      /* eslint-disable */
      const { data } = await loginByMobile({
        'mobile': phone,
        'validate_code': code,
        'validate_token': this.validate_token,
      })
      Toast.hide()
      /* eslint-enable */
      if (data) {
        this.props.history.goBack()
      }
    } catch ({ err }) {
      Toast.info(err)
    }
  }

  changeState = (v, key) => {
    this.setState({
      [key]: v.target.value,
    })
  }

  render() {
    const { phone, code } = this.state

    return (
      <div className={styles.login}>
        <div className={styles.logo}>
          <SvgIcon name="#logo" />
        </div>
        <div className={styles.form}>
          <div className={styles.item}>
            <input type="tel" maxLength={11} placeholder="手机号" value={phone} onChange={v => this.changeState(v, 'phone')} />
            <button className={styles['code-btn']} onClick={this.getCode}>获取验证码</button>
          </div>
          <div className={styles.item}>
            <input type="tel" maxLength={8} placeholder="验证码" value={code} onChange={v => this.changeState(v, 'code')} />
          </div>
        </div>
        <p className={styles.desc}>
          温馨提示：未注册饿了么帐号的手机号，登录时将自动注册，且代表您已同意<span>《用户服务协议》</span>
        </p>
        <button className={styles['login-btn']} onClick={this.handleLogin}>登录</button>
      </div>
    )
  }
}
