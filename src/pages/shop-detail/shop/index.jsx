

import React from 'react'
import styles from './index.less'

export default class ShopInfo extends React.PureComponent {
  render() {
    const { show } = this.props
    return (
      <div className={styles['shop-info']} style={{ display: show ? 'block' : 'none' }}>ShopInfo</div>
    )
  }
}
