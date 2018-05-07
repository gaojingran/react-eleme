

import React from 'react'
import cls from 'classnames'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import config from 'utils/config'
import SvgIcon from 'components/icon-svg'
import { restaurantUpdate } from '../../stores/restaurant'
import styles from './index.less'

// 距离最近 id = 6

const { orderByMap } = config
const mapStateToProps = ({ restaurant }) => ({
  order_by: restaurant.order_by,
  super_vip: restaurant.super_vip,
})
const mapDispatchToProps = dispatch => bindActionCreators({
  restaurantUpdate,
}, dispatch)

@connect(mapStateToProps, mapDispatchToProps)
export default class FilterBar extends React.PureComponent {
  render() {
    const { order_by, super_vip } = this.props
    const firtItem = orderByMap.find(v => v.id === order_by).name || orderByMap[0].name
    const itemStyles = () => {
      const isHas = orderByMap.find(v => v.id === order_by)
      return cls(styles.item, isHas ? styles.active : null)
    }

    return (
      <div className={styles.filter}>
        <div className={itemStyles()}>
          <span>{firtItem}</span>
          <SvgIcon className={styles.triangle} name="#triangle_down_fill" />
        </div>
        <div className={cls(styles.item, order_by === 6 ? styles.active : null)}>
          <span>距离最近</span>
        </div>
        <div className={cls(styles.item, super_vip === 1 ? styles.active : null)}>
          <SvgIcon className={styles.crown} name="#crown" />
          <span>会员领红包</span>
        </div>
        <div className={styles.item}>
          <span>筛选</span>
          <SvgIcon className={styles.icon} name="#filter" />
        </div>
      </div>
    )
  }
}
