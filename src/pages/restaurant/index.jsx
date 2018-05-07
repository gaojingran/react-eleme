

import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Loading from 'components/loading'
import Scroll from 'components/scroll'
import { restaurantDestroy, restaurantInit } from '../../stores/restaurant'
import ShopListRow from '../common-components/shop-list-row'
import NavBar from '../common-components/nav-bar'
import NoData from '../common-components/no-data'
import SiftFactors from './sift-factors'
import FilterBar from './filter'
import styles from './index.less'

const mapStateToProp = ({ restaurant }) => ({
  loading: restaurant.loading,
  shopList: restaurant.shopList,
})
const mapDispatchToProps = dispatch => bindActionCreators({
  restaurantInit,
  restaurantDestroy,
}, dispatch)

@connect(mapStateToProp, mapDispatchToProps)
export default class Shop extends React.Component {
  componentDidMount() {
    const { location } = this.props
    this.props.restaurantInit(location.state)
  }

  componentWillUnmount() {
    this.props.restaurantDestroy()
  }

  refreshScroll = () => {
    this.scroll && this.scroll.refresh()    // eslint-disable-line
  }

  render() {
    const { location, loading, shopList } = this.props
    console.log(location.state, loading, shopList)
    const renderList = () => {
      if (loading && !shopList.length) {
        return <Loading style={{ marginTop: 20 }} />
      }
      return (
        <Scroll dataSource={shopList} ref={c => this.scroll = c}>
          {
            shopList.length ? shopList.map((v, i) => (
              <ShopListRow key={i} refresh={this.refreshScroll} data={v} />
            )) : <NoData />
          }
        </Scroll>
      )
    }

    return (
      <div className={styles.restaurant}>
        <NavBar
          title={location.state.target_name}
          iconLeft="#back"
          leftClick={() => this.props.history.goBack()} />
        <SiftFactors />
        <FilterBar />
        <div className={styles.list}>
          {renderList()}
        </div>
      </div>
    )
  }
}
