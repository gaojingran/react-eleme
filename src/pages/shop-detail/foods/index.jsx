

import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getImageUrl } from 'utils/utils'
import Scroll from 'components/scroll'
import Modal from 'components/modal'
import SvgIcon from 'components/icon-svg'
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
  state = {
    foodVisible: false, // 商品详情
    specsVisible: false, // 选规格
    foodInfo: {},
  }

  componentWillUnmount() {
    if (this.timer) {
      clearTimeout(this.timer)
      this.timer = null
    }
  }

  getFoodPrice = (foods = []) => {
    const defaultFood = foods.find(v => v.food_id < 0)
    if (foods.length > 0 && defaultFood) {
      return `¥${defaultFood.price}起`
    }
    return `¥${foods[0].price}`
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

  foodClick = (f) => {
    this.timer && clearTimeout(this.timer) // eslint-disable-line
    this.timer = setTimeout(() => {
      this.setState({
        foodVisible: true,
        foodInfo: f,
      })
    }, 60)
  }

  modalCancel = () => {
    this.setState({
      foodVisible: false,
      specsVisible: false,
      foodInfo: {},
    })
  }

  chooseSpecs = (food) => {
    this.setState({
      specsVisible: true,
      foodInfo: food,
    })
  }

  render() {
    const { menu, show } = this.props
    const { foodVisible, foodInfo, specsVisible } = this.state
    const scrollWrapProps = {
      dataSource: menu,
      probeType: 3,
      listenScroll: true,
      scroll: pos => this.handleScroll(pos),
    }
    console.log(menu, specsVisible, foodInfo)
    return (
      <div className={styles['food-wrapper']} style={{ display: show ? 'flex' : 'none' }}>
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
                            <div className={styles.img} onClick={() => this.foodClick(f)}>
                              <img src={getImageUrl(f.image_path)} />
                            </div>
                            <div className={styles.content}>
                              <h1 className={styles.name}>{f.name}</h1>
                              <p className={styles.description}>{f.description}</p>
                              <p className={styles.info}>
                                <span>月售{f.month_sales}份</span>
                                <span>好评率{f.satisfy_rate}%</span>
                              </p>
                              <p className={styles['sales-info']}>
                                <span className={styles.price}>
                                  {this.getFoodPrice(f.specfoods)}
                                </span>
                                {
                                  f.attrs.length ? (
                                    <button
                                      className={styles.specs}
                                      onClick={() => this.chooseSpecs(f)}>
                                      选规格
                                    </button>
                                  ) : null
                                }
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

        <Modal visible={foodVisible}>
          <div className={styles['food-modal']} key="food" onClick={this.modalCancel}>
            <div className={styles.body}>
              <img src={getImageUrl(foodInfo.image_path)} className={styles.img} />
              <div className={styles.content}>
                <h1 className={styles.name}>{foodInfo.name}</h1>
                <p className={styles.description}>{foodInfo.description}</p>
                <p className={styles.info}>
                  <span>月售{foodInfo.month_sales}份</span>
                  <span>好评率{foodInfo.satisfy_rate}%</span>
                </p>
              </div>
            </div>
          </div>
        </Modal>

        <Modal visible={specsVisible}>
          <div className={styles['specs-modal']} key="specs">
            <div className={styles.body}>
              <h1 className={styles.title}>{foodInfo.name}</h1>
              <SvgIcon name="#close" className={styles.close} onClick={this.modalCancel} />
              {
                foodInfo.specfoods && foodInfo.specfoods.length ? (
                  <div className={styles.container}>
                    <h1 className={styles.title}>规格</h1>
                    <div className={styles.wrapper}>
                      {
                        foodInfo.specfoods.map(v => (
                          <div key={v.food_id} className={styles.item}>{v.specs[0].value}</div>
                        ))
                      }
                    </div>
                  </div>
                ) : null
              }
              {
                foodInfo.attrs && foodInfo.attrs.length ? (
                  foodInfo.attrs.map((v, i) => (
                    <div className={styles.container} key={i}>
                      <h1 className={styles.title}>{v.name}</h1>
                      <div className={styles.wrapper}>
                        {
                          v.values.map((specs, ids) => (
                            <div key={ids} className={styles.item}>{specs}</div>
                          ))
                        }
                      </div>
                    </div>
                  ))
                ) : null
              }
            </div>
            <div className={styles.mask} onClick={this.modalCancel} />
          </div>
        </Modal>
      </div>
    )
  }
}
