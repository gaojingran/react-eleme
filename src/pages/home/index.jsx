
/*eslint-disable*/
import React from 'react'
import Toast from 'components/toast'
import Scroll from 'components/scroll'
import styles from './index.less'

export default class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dataSource: [],
    };
  }

  componentDidMount() {
    const initData = Array.from({ length: 30 }, (v, i) => `test item No:${i + 1}`);
    this.setState({ dataSource: initData });
  }

  render() {
    const { dataSource } = this.state;
    const handlePullingDown = () => {
      // 模拟更新数据
      setTimeout(() => {
        if (Math.random() > 0.5) {
          // 如果有新数据
          this.setState({
            dataSource: [ `new item NO: ${+new Date()}`, ...this.state.dataSource]
          })
        } else {
          // 如果没有新数据
          this.scrollView.forceUpdate()
        }
      }, 2000)
    };

    const handlePullingUp = () => {
      // 更新数据
      setTimeout(() => {
        if (Math.random() > 0.5) {
          // 如果有新数据
          const newItem = Array.from({ length: 10}, (v, i) => `test item No: ${dataSource.length + i + 1}`);
          this.setState({
            dataSource: [ ...dataSource, ...newItem ]
          })
        } else {
          // 如果没有新数据
          this.scrollView.forceUpdate()
        }
      }, 1500)
    };

    const scrollOptions = {
      dataSource,
      probeType: 3,
      click: true,
      // listenScroll: true,
      // scroll: (pos) => { console.log('scroll: ' + JSON.stringify(pos)) },
      direction: 'vertical',
      pullDownRefresh: { stop: 46 },
      pullUpLoad: true,
      pullingDown: handlePullingDown,
      pullingUp: handlePullingUp,
    };

    return (
      <div className={styles.root}>
        <div className={styles.btn} onClick={() => Toast.info('message', 2, false, () => console.log('close'))}>Toast</div>
        <div className={styles.btn} onClick={() => Toast.hide()}>Hide</div>

        <div className={styles['scroll-wrapper']}>
          <Scroll ref={c => this.scrollView = c} {...scrollOptions}>
            {
              dataSource.map(v => (
                <div
                  key={v}
                  className={styles.item}
                >{v}</div>
              ))
            }
          </Scroll>
        </div>
      </div>
    )
  }
}
