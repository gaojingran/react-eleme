
import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Toast from 'components/toast'
import { increment, decrement, sss, aaa } from 'stores/home'
import { getEntry } from '../../api'
import styles from './index.less'

const mapStateToProps = ({ home }) => ({
  count: home.count,
})

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    increment,
    decrement,
    sss,
    aaa,
  }, dispatch)
}

@connect(mapStateToProps, mapDispatchToProps)
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
        <button onClick={() => this.props.sss()}>increment</button>
        <button onClick={() => this.props.aaa()}>decrement</button>
      </div>
    )
  }
}
