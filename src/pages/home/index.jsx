

import React from 'react'
import { connect } from 'react-redux'
import Toast from 'components/toast'
import { increment, decrement } from 'stores/home'
import { getEntry } from '../../api'
import styles from './index.less'

@connect(({ home }) => ({
  count: home.count,
}), {
  increment,
  decrement,
})
export default class Home extends React.Component {
  componentDidMount() {
    this.initPage()
    console.log(this.props)
  }

  initPage = async () => {
    try {
      const { data } = await getEntry()
      console.log(data)
    } catch ({ err }) {
      Toast.info(err, 3)
    }
  }

  render() {
    return (
      <div className={styles.root}>
        <div>{this.props.count}</div>
        <button onClick={() => this.props.increment()}>increment</button>
        <button onClick={() => this.props.decrement()}>decrement</button>
      </div>
    )
  }
}
