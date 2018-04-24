

import React from 'react'
import ReactDom from 'react-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchOrderList } from 'stores/order'
import Scroll from 'components/scroll'
import NabBar from '../common-components/nav-bar'
import withTabBar from '../common-components/tab-bar'
import OrderRow from '../common-components/order-list-row'
import AuthErr from '../common-components/auth-err'
import RowSk from '../common-components/skeleton/row'
import styles from './index.less'

const mapStateToProps = ({ globalState, order }) => ({
  isLogin: globalState.isLogin,
  init: order.init,
  orderList: order.orderList,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchOrderList,
}, dispatch)

@connect(mapStateToProps, mapDispatchToProps)
@withTabBar
export default class Order extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      topBarHeight: 0,
    }
  }

  componentDidMount() {
    const { isLogin, init } = this.props
    if (isLogin && !init) {
      this.props.fetchOrderList(true, false)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isLogin && !nextProps.init) {
      this.props.fetchOrderList(true, false)
    }
  }

  getTopBarHeight = (topBar) => {
    if (topBar) {
      this.setState({
        topBarHeight: ReactDom.findDOMNode(topBar).clientHeight,
      })
    }
  }

  handlePullingDown = () => {
    this.props.fetchOrderList(true, () => {
      this.scroll && this.scroll.forceUpdate()     // eslint-disable-line
    })
  }

  handlePullingUp = () => {
    this.props.fetchOrderList(false, () => {
      this.scroll && this.scroll.forceUpdate()     // eslint-disable-line
    })
  }

  render() {
    const { topBarHeight } = this.state
    const { orderList, isLogin, init } = this.props
    const scrollProps = {
      className: styles.scroll,
      dataSource: orderList,
      style: { top: topBarHeight },
      pullDownRefresh: { stop: 40 },
      pullUpLoad: true,
      pullingDown: this.handlePullingDown,
      pullingUp: this.handlePullingUp,
    }

    return (
      <div className={styles.order}>
        <NabBar
          className={styles.nav}
          ref={this.getTopBarHeight}
          title="订单"
          iconLeft="#back"
          leftClick={() => this.props.history.goBack()} />
        {
          isLogin ? (
            <Scroll {...scrollProps} ref={c => this.scroll = c}>
              {
                init ? orderList.map(v => (
                  <OrderRow key={v.id} data={v} />
                )) : Array.from({ length: 10 }, (v, i) => i).map(v => (
                  <RowSk key={v} style={{ backgroundColor: '#fff', marginBottom: 10 }} />
                ))
              }
            </Scroll>
          ) : <AuthErr />
        }
      </div>
    )
  }
}
