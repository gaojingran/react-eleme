
import React from 'react'
import ReactDom from 'react-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Slide from 'components/slide'
import Scroll from 'components/scroll'
import { homeUpdate, homeInit } from '../../stores/home'
import withTabBar from '../common-components/tab-bar'
import TitleBar from '../common-components/title-bar'
import ShopListRow from '../common-components/shop-list-row'
import TopBar from './top-bar'
import styles from './index.less'

const mapStateToProps = ({ home }) => ({
  init: home.init,
  banner: home.banner,
  entry: home.entry,
  shoplist: home.shoplist,
})
const mapActionsToProps = dispatch => bindActionCreators({
  homeUpdate,
  homeInit,
}, dispatch)

@connect(
  mapStateToProps,
  mapActionsToProps,
)
@withTabBar
export default class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      topBarHeight: 0,
    }
  }

  componentDidMount() {
    this.props.homeInit()
  }

  getTopBarHeight = (topBar) => {
    if (topBar) {
      this.setState({
        topBarHeight: ReactDom.findDOMNode(topBar).clientHeight,
      })
    }
  }

  imgLoaded = () => {
    if (this.scroll && !this.loadImg) {
      this.loadImg = true
      this.scroll.refresh()
    }
  }

  render() {
    const { topBarHeight } = this.state
    const {
      banner,
      entry,
      shoplist,
      init,
    } = this.props
    const scrollProps = {
      className: styles.scroll,
      style: { top: topBarHeight },
    }
    console.log(this.props.shoplist)
    return (
      <div className={styles.root}>
        <TopBar ref={this.getTopBarHeight} />
        {
          init ? (
            <Scroll {...scrollProps} ref={c => this.scroll = c}>
              <Slide>
                {
                  banner.map(v => (
                    <img key={v.id} src={v.image_url} alt="" />
                  ))
                }
              </Slide>
              <div className={styles['entry-wrapper']}>
                {
                  entry.slice(0, 10).map(v => (
                    <div className={styles.item} key={v.id}>
                      <div className={styles.img}>
                        <img alt="" src={v.image_url} />
                      </div>
                      <p className={styles.name}>{v.name}</p>
                    </div>
                  ))
                }
              </div>
              <TitleBar title="推荐商家" />
              {
                shoplist.map(shop => (
                  <ShopListRow key={shop.restaurant.id} data={shop.restaurant} />
                ))
              }
            </Scroll>
          ) : null
        }
      </div>
    )
  }
}
