

import React from 'react'
import qs from 'query-string'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getImageUrl } from 'utils/utils'
import SvgIcon from 'components/icon-svg'
import VerticalSlide from 'components/vertical-slide'
import Badge from '../common-components/badge'
import { shopUpdate, shopDestroy, shopInit } from '../../stores/shop'
import styles from './index.less'

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

  render() {
    const { info, history } = this.props
    const shopImage = getImageUrl(info.image_path)
    const activities = info.activities || []

    console.log(info)
    return (
      <div className={styles.shop}>

        <div className={styles.nav}>
          <div className={styles.icon} onClick={() => history.goBack()}>
            <SvgIcon name="#back" />
          </div>
          <div className={styles.content}>123</div>
        </div>

        <div className={styles.header} style={{ backgroundImage: `url(${shopImage})` }}>
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
                  <VerticalSlide>
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
          <div className={styles.filter} />
        </div>

      </div>
    )
  }
}
