

import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getImageUrl } from 'utils/utils'
import Scroll from 'components/scroll'
import Menu from './menu'
import { shopUpdate } from '../../../stores/shop'
import styles from './index.less'

const mapStateToProps = ({ shop }) => ({
  menu: shop.menu,
})
const mapDispatchToProps = dispatch => bindActionCreators({
  shopUpdate,
}, dispatch)
@connect(mapStateToProps, mapDispatchToProps)
export default class Foods extends React.PureComponent {
  componentWillUnmount() {
    if (this.timer) {
      clearTimeout(this.timer)
      this.timer = null
    }
  }

  foodWrapperRender = (foodWrapper) => {
    this.foodWrapper = foodWrapper
    const listNode = foodWrapper ? foodWrapper.childNodes : []
    let height = 0
    // 计算每一个分类的高度
    this.listHeight = []
    this.listHeight.push(height)
    for (let i = 0; i < listNode.length; i++) {
      this.listHeight.push(height += listNode[i].clientHeight)
    }
  }

  handleScroll = ({ y }) => {
    const scrollY = Math.abs(y)
    if (this.listHeight.length) {
      this.listHeight.forEach((height, i) => {
        const nextHeight = this.listHeight[i + 1]
        if (nextHeight && scrollY >= height && scrollY < nextHeight) {
          this.props.shopUpdate({
            foodMenuIndex: i,
          })
        }
      })
    }
  }

  menuClick = (i) => {
    if (!this.foodWrapper) return
    const items = this.foodWrapper.childNodes
    this.foodScroll.scrollToElement(items[i], 300)
    this.timer = setTimeout(() => {
      this.props.shopUpdate({
        foodMenuIndex: i,
      })
    }, 300)
  }

  render() {
    const { menu } = this.props
    const scrollWrapProps = {
      dataSource: menu,
      probeType: 3,
      listenScroll: true,
      scroll: pos => this.handleScroll(pos),
    }

    return (
      <div className={styles['food-wrapper']}>
        <div className={styles.menu}>
          <Menu menuClick={this.menuClick} />
        </div>
        <div className={styles.food}>
          <Scroll {...scrollWrapProps} ref={c => this.foodScroll = c}>
            <div ref={this.foodWrapperRender}>
              {
                menu.map((v, i) => (
                  <div className={styles.wrapper} key={i}>
                    <p className={styles.title}>
                      <span className={styles.tip}>{v.name}</span>
                      <span className={styles.desc}>{v.description}</span>
                    </p>
                    <div className={`${styles.line} hairline-h`} />
                    <ul>
                      {
                        v.foods.map(f => (
                          <li key={f.item_id} className={styles.item}>
                            <div className={styles.img}>
                              <img src={getImageUrl(f.image_path)} />
                            </div>
                            <div className={styles.content}>
                              <h1 className={styles.name}>{f.name}</h1>
                              <p className={styles.description}>{f.description}</p>
                              <p className={styles.info}>
                                <span>月售{f.month_sales}份</span>
                                <span>好评率{f.satisfy_rate}%</span>
                              </p>
                            </div>
                          </li>
                        ))
                      }
                    </ul>
                  </div>
                ))
              }
            </div>
          </Scroll>
        </div>
      </div>
    )
  }
}
