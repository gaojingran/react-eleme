
import React from 'react'
import { connect } from 'react-redux'
import cls from 'classnames'
import Scroll from 'components/scroll'
import SvgIcon from 'components/icon-svg'
import styles from './index.less'

@connect(({ restaurant }) => ({
  category: restaurant.category,
  siftFactors: restaurant.siftFactors,
  selectFactorsId: restaurant.selectFactorsId,
}))
export default class SiftFactors extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      horizontalWidth: 1000,
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.siftFactors !== this.props.siftFactors) {
      this.computedMenuWidth()
    }
  }

  computedMenuWidth = () => {
    if (!this.menuWrapper) return
    const menus = this.menuWrapper.childNodes
    const width = Array.from(menus).reduce((acc, dom) => {
      return dom.clientWidth + 1 + acc
    }, 0)
    this.setState({ horizontalWidth: width })
  }

  render() {
    const { horizontalWidth } = this.state
    const { siftFactors, selectFactorsId, category } = this.props
    const menuStyle = id => cls([styles.menu, id === selectFactorsId ? styles.active : null])

    console.log(category)
    return (
      <div className={styles.factors}>
        <div className={styles.categories}>
          <Scroll
            direction="horizontal"
            horizontalWidth={horizontalWidth}
            className={styles.scroll}>
            <div className={styles['menu-wrapper']} ref={c => this.menuWrapper = c}>
              {
                siftFactors.map(v => (
                  <div key={v.id} className={menuStyle(v.id)}>{v.name}</div>
                ))
              }
            </div>
          </Scroll>
        </div>
        <div className={styles.icon}>
          <SvgIcon className={styles.more} name="#unfold" />
        </div>
      </div>
    )
  }
}
