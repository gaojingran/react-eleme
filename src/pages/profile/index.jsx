

import React from 'react'
import SvgIcon from 'components/icon-svg'
import NabBar from '../common-components/nav-bar'
import withTabBar from '../common-components/tab-bar'
import styles from './index.less'

@withTabBar
export default class Profile extends React.Component {
  render() {
    const { history } = this.props;
    const goLogin = () => {
      history.push('/login')
    }

    return (
      <div className={styles.root}>
        <NabBar
          title="我的"
          iconLeft="#back"
          leftClick={() => this.props.history.goBack()} />

        <div className={styles['profile-info']}>
          <div className={styles.avatar}>
            <SvgIcon name="#avatar" className={styles.icon} />
          </div>
          <div className={styles.desc}>
            <p className={styles.info} onClick={goLogin}>登陆/注册</p>
            <p className={styles.text}>
              <SvgIcon name="#iphone" className={styles.icon} />
              <span>登陆后享受更多特权</span>
            </p>
          </div>
          <SvgIcon name="#right" className={styles['icon-right']} />
        </div>

        <div className={styles.column}>
          <div className={styles.item}>
            <div className={styles.icon}>
              <SvgIcon name="#purse" />
            </div>
            <p className={styles.desc}>钱包</p>
          </div>
          <div className={styles.item}>
            <div className={styles.icon}>
              <SvgIcon name="#red-packet" />
            </div>
            <p className={styles.desc}>红包</p>
          </div>
          <div className={styles.item}>
            <div className={styles.icon}>
              <SvgIcon name="#gold" />
            </div>
            <p className={styles.desc}>金币</p>
          </div>
        </div>

        <div className={styles.list}>
          <div className={styles.item}>
            <div className={styles.icon}>
              <SvgIcon name="#pointer" />
            </div>
            <p className={styles.desc}>我的地址</p>
            <SvgIcon name="#right" className={styles['icon-right']} />
          </div>
        </div>

      </div>
    )
  }
}
