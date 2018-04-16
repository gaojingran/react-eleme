
/* eslint-disable */
import React from 'react'
import Proptypes from 'prop-types'
import loading from './loading.gif'
import styles from './index.less'

export default class Loading extends React.Component {
  static proptypes = {
    title: Proptypes.string,
  }

  static defaultProps = {
    title: ''
  }

  constructor(props) {
    super(props)
    this.ratio = window.devicePixelRatio
    this.state = {
      width: 24 * this.ratio,
      height: 24 * this.ratio,
    }
  }

  render() {
    const { width, height } = this.state
    const { title } = this.props
    return (
      <div className={styles.loading}>
        <img
          src={loading}
          width={width}
          height={height}
          style={{ width: width / this.ratio, height: height / this.ratio }} />
        <p className={styles.desc}>loading...</p>
      </div>
    )
  }
}
