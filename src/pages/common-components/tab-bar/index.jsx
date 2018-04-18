

import React from 'react'
import cls from 'classnames'
import SvgIcon from 'components/icon-svg'
import styles from './index.less'

export default (Component) => {
  return class TabBar extends React.Component {
    render() {
      const { pathname } = this.props.location
      const itemCls = name => cls({
        [styles.item]: true,
        [styles.active]: pathname === name,
      })
      return (
        <div className={styles.root}>
          <Component {...this.props} />
          <div className={styles['tab-wrapper']}>
            <div className={itemCls('/home')}>
              <SvgIcon className={cls(styles.icon, styles.scale)} name="#elem" />
              <h1 className={styles.text}>微淘</h1>
            </div>
            <div className={itemCls('/compass')}>
              <SvgIcon className={styles.icon} name="#compass" />
              <h1 className={styles.text}>发现</h1>
            </div>
            <div className={itemCls('/order')}>
              <SvgIcon className={styles.icon} name="#form" />
              <h1 className={styles.text}>订单</h1>
            </div>
            <div className={itemCls('/mine')}>
              <SvgIcon className={styles.icon} name="#people" />
              <h1 className={styles.text}>我的</h1>
            </div>
          </div>
        </div>
      )
    }
  }
}
