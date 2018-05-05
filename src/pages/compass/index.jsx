

import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Scroll from 'components/scroll'
import NavBar from '../common-components/nav-bar'
import withTabBar from '../common-components/tab-bar'
import AuthErr from '../common-components/auth-err'
import RecommedFoodRow from '../common-components/recommend-food-row'
import NoData from '../common-components/no-data'
import { fetchFoodList } from '../../stores/compass'
import styles from './index.less'

const mapStateToProps = ({ globalState, compass }) => ({
  isLogin: globalState.isLogin,
  init: compass.init,
  foodList: compass.foodList,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchFoodList,
}, dispatch)

@connect(mapStateToProps, mapDispatchToProps)
@withTabBar
export default class Compass extends React.Component {
  componentDidMount() {
    const { isLogin, init } = this.props
    if (isLogin && !init) {
      this.props.fetchFoodList()
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isLogin && !nextProps.init) {
      this.props.fetchFoodList()
    }
  }

  render() {
    const {
      isLogin,
      foodList,
      init,
      history,
    } = this.props

    console.log(foodList, init)

    const scrollProps = {
      className: styles.scroll,
      dataSource: foodList,
      pullUpLoad: true,
      pullingUp: this.props.fetchFoodList,
    }

    return (
      <div className={styles.compass}>
        <NavBar
          title="发现"
          iconLeft="#back"
          leftClick={() => history.goBack()} />
        {
          isLogin ? (
            <Scroll {...scrollProps}>
              {
                foodList.length ? foodList.map((v, i) => (
                  <RecommedFoodRow key={i} data={v} />
                )) : <NoData />
              }
            </Scroll>
          ) : <AuthErr />
        }
      </div>
    )
  }
}
