
import React from 'react'
import qs from 'query-string'
import cls from 'classnames'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getImageUrl } from 'utils/utils'
import SvgIcon from 'components/icon-svg'
import VerticalSlide from 'components/vertical-slide'
import Scroll from 'components/scroll'
import { prefixStyle } from 'utils/dom'
import Badge from '../common-components/badge'
import Foods from './foods'
import Ratings from './ratings'
import ShopInfo from './shop'
import { shopUpdate, shopDestroy, shopInit } from '../../stores/shop'
import styles from './index.less'

const transform = prefixStyle('transform')
const backdrop = prefixStyle('backdrop-filter')

const mapStateToProps = ({ shop }) => ({
  loading: shop.loading,
  info: shop.info,
})
const mapDispatchToProps = dispatch => bindActionCreators({
  shopUpdate,
  shopDestroy,
  shopInit,
}, dispatch)
@connect(mapStateToProps, mapDispatchToProps)
export default class ShopDetail extends React.Component {
  constructor(props) {
    super(props)
    this.navHeight = 0
    this.headerHeight = 0
    this.state = {
      tabIndex: 0,
    }
  }

  componentDidMount() {
    const query = qs.parse(this.props.location.search) || {}
    this.props.shopInit(query)
  }

  componentWillUnmount() {
    this.props.shopDestroy()
  }

  handleScroll = ({ y }) => {
    let blur = 0
    const headerHeight = this.headerHeight || this.header.clientHeight
    const navHeight = this.navHeight || this.navBar.clientHeight
    const critical = -headerHeight + navHeight
    const navY = Math.min(0, Math.max(critical - y, critical))
    const percent = Math.abs(y / headerHeight)
    if (y < 0) {
      blur = Math.min(20, percent * 20)
    }
    this.navBar.style[transform] = `translate3d(0,${navY}px,0)`
    this.blurBg.style[backdrop] = `blur(${blur}px)`
  }

  tabClick = (i) => {
    this.setState({ tabIndex: i })
  }

  render() {
    const { info, loading, history } = this.props
    const { tabIndex } = this.state
    const shopImage = getImageUrl(info.image_path)
    const activities = info.activities || []

    const verticalScrollProps = {
      loop: activities.length > 1,
      autoPlay: activities.length > 1,
    }

    const scrollProps = {
      className: styles.scroll,
      contentClassName: styles.contentScroll,
      probeType: 3,
      listenScroll: true,
      scroll: pos => this.handleScroll(pos),
      bounce: false,
    }

    const activeCls = i => cls([styles.item, tabIndex === i ? styles.active : null])

    return loading ? null : (
      <div className={styles.shop}>
        <div className={styles.navbar}>
          <div className={styles.icon} onClick={() => history.goBack()}>
            <SvgIcon name="#back" />
          </div>
          <div className={styles.content} ref={c => this.navBar = c}>{info.name}</div>
        </div>

        <Scroll {...scrollProps}>
          <div className={styles.header} ref={c => this.header = c}>
            <div className={styles.avatar}>
              <img src={shopImage} />
            </div>
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
            <div className={styles.imgBg} style={{ backgroundImage: `url(${shopImage})` }} />
            <div className={styles.filter} ref={c => this.blurBg = c} />
          </div>

          <div className={styles.tab}>
            <div className={activeCls(0)} onClick={() => this.tabClick(0)}>点餐</div>
            <div className={activeCls(1)} onClick={() => this.tabClick(1)}>评价</div>
            <div className={activeCls(2)} onClick={() => this.tabClick(2)}>商家</div>
          </div>

          <div className={styles.body}>
            <Foods show={tabIndex === 0} />
            <Ratings show={tabIndex === 1} />
            <ShopInfo show={tabIndex === 2} />
          </div>
        </Scroll>

        <div className={styles.footer}>footer</div>
      </div>
    )
  }
}
