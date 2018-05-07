

import React from 'react'
import NavBar from '../common-components/nav-bar'
import styles from './index.less'

export default class Shop extends React.Component {
  render() {
    const { location } = this.props
    console.log(location.state)
    return (
      <div className={styles.shop}>
        <NavBar
          title={location.state.target_name}
          iconLeft="#back"
          leftClick={() => this.props.history.goBack()} />
      </div>
    )
  }
}
