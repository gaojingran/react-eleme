
import React from 'react'
import cls from 'classnames'
import { connect } from 'react-redux'
import styles from './index.less'

const mapStateToProps = ({ shop }) => ({
  menu: shop.menu,
  foodMenuIndex: shop.foodMenuIndex,
})
@connect(mapStateToProps)
export default class FoodMenu extends React.PureComponent {
  render() {
    const { menu, foodMenuIndex, menuClick } = this.props
    const menuCls = v => cls([styles.item, v === foodMenuIndex ? styles.active : null])
    return (
      <div className={styles['food-menu']}>
        {
          menu.map((v, i) => (
            <div key={i} className={menuCls(i)} onClick={() => menuClick(i)}>
              <span className={styles.text}>{v.name}</span>
            </div>
          ))
        }
      </div>
    )
  }
}
