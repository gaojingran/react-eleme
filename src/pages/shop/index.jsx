

import React from 'react'
import qs from 'query-string'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getImageUrl } from 'utils/utils'
import SvgIcon from 'components/icon-svg'
import VerticalSlide from 'components/vertical-slide'
import Scroll from 'components/scroll'
import { prefixStyle } from 'utils/dom'
import Badge from '../common-components/badge'
import { shopUpdate, shopDestroy, shopInit } from '../../stores/shop'
import styles from './index.less'

const transform = prefixStyle('transform')
const backdrop = prefixStyle('backdrop-filter')

const mapStateToProps = ({ shop }) => ({
  loading: shop.loading,
  info: shop.info,
  menu: shop.menu,
  ratings: shop.ratings,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  shopUpdate,
  shopDestroy,
  shopInit,
}, dispatch)

@connect(mapStateToProps, mapDispatchToProps)
export default class Shop extends React.Component {
  componentDidMount() {
    const query = qs.parse(this.props.location.search) || {}
    this.props.shopInit(query)
  }

  componentWillUnmount() {
    this.props.shopDestroy()
  }

  handleScroll = ({ y }) => {
    let scale = 1
    let blur = 0
    // nav 高度
    const navHeight = this.navContent.clientHeight
    // header 高度
    const headerHeight = this.imgBg.clientHeight
    const layerTabMaxTranslate = -headerHeight + navHeight

    const layerTabTranslateY = Math.max(layerTabMaxTranslate, Math.min(0, y))
    const navTranslateY = Math.min(0, Math.max(-headerHeight + navHeight - y, -headerHeight + navHeight))   // eslint-disable-line

    const percent = Math.abs(y / headerHeight)

    if (y > 0) {
      scale = 1 + percent
    } else {
      blur = Math.min(20, percent * 20)
    }

    this.layerBg.style[transform] = `translate3d(0,${layerTabTranslateY}px,0)`
    this.tabBar.style[transform] = `translate3d(0,${layerTabTranslateY}px,0)`
    this.navContent.style[transform] = `translate3d(0,${navTranslateY}px,0)`
    this.imgBg.style[transform] = `scale(${scale})`
    this.blurBg.style[backdrop] = `blur(${blur}px)`
  }

  render() {
    const { info, history } = this.props
    const shopImage = getImageUrl(info.image_path)
    const activities = info.activities || []

    const verticalScrollProps = {
      loop: activities.length > 1,
      autoPlay: activities.length > 1,
    }

    const scrollWrapProps = {
      className: styles['outer-scroll'],
      probeType: 3,
      listenScroll: true,
      scroll: pos => this.handleScroll(pos),
    }

    console.log(info)
    return (
      <div className={styles.shop}>

        <div className={styles.nav}>
          <div className={styles.icon} onClick={() => history.goBack()}>
            <SvgIcon name="#back" />
          </div>
          <div className={styles.content} ref={c => this.navContent = c}>{info.name}</div>
        </div>

        <div className={styles.header}>
          <div className={styles.avatar}>
            <img src={shopImage} />
          </div>
          <div ref={c => this.descWrapper = c}>
            <div className={styles.info}>
              <div className={styles.name}>
                <h1 className={styles.text}>{info.name}</h1>
                <div className={styles.icon}><SvgIcon name="#right" /></div>
              </div>
              <div className={styles.desc}>
                <span>{info.rating}</span>
                <span>月售{info.recent_order_num}单</span>
                {
                  info.delivery_mode ? <span>蜂鸟快送</span> : null
                }
                <span>约{info.order_lead_time}分钟</span>
                <span>距离{info.distance}m</span>
              </div>
              <p className={styles.promotion}>{info.promotion_info}</p>
            </div>
            <div className={styles.activities}>
              <div className={styles.slide}>
                {
                  activities.length ? (
                    <VerticalSlide {...verticalScrollProps}>
                      {
                        activities.map(v => (
                          <div className={styles.item} key={v.id}>
                            <Badge
                              className={styles.icon}
                              text={v.icon_name}
                              style={{ backgroundColor: `#${v.icon_color}` }} />
                            <span className={styles.tips}>{v.tips}</span>
                          </div>
                        ))
                      }
                    </VerticalSlide>
                  ) : null
                }
              </div>
              <div className={styles.sum}>{activities.length}个优惠</div>
            </div>
          </div>
          <div className={styles.imgBg} ref={c => this.imgBg = c} style={{ backgroundImage: `url(${shopImage})` }} />
          <div className={styles.filter} ref={c => this.blurBg = c} />
        </div>

        <div className={styles['layer-bg']} ref={c => this.layerBg = c} />

        <div className={styles['tab-wrapper']} ref={c => this.tabBar = c}>
          <div className={styles.item}>点餐</div>
          <div className={styles.item}>评价</div>
          <div className={styles.item}>商家</div>
        </div>

        <div className={styles['scroll-wrapper']}>
          <Scroll {...scrollWrapProps}>
            <div className={styles.item}>123</div>
            <div className={styles.item}>123</div>
            <div className={styles.item}>123</div>
            <div className={styles.item}>123</div>
            <div className={styles.item}>123</div>
            <div className={styles.item}>123</div>
            <div className={styles.item}>123</div>
            <div className={styles.item}>123</div>
          </Scroll>
        </div>

      </div>
    )
  }
}
