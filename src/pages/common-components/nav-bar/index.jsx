

import React from 'react'
import Proptypes from 'prop-types'
import SvgIcon from 'components/icon-svg'
import styles from './index.less'

export default class NavBar extends React.PureComponent {
  /* eslint-disable */
  static proptypes = {
    iconLeft: Proptypes.string,
    iconRight: Proptypes.string,
    leftClick: Proptypes.func,
    rightClick: Proptypes.func,
    title: Proptypes.string,
  }
  /* eslint-enable */

  static defaultProps = {
    iconLeft: '',
    iconRight: '',
    leftClick: () => {},
    rightClick: () => {},
    title: '',
  }

  render() {
    const {
      iconLeft,
      iconRight,
      leftClick,
      rightClick,
      title,
    } = this.props
    return (
      <div className={styles.nav}>
        {
          iconLeft ? (
            <div className={styles.icon} onClick={leftClick}>
              <SvgIcon name={iconLeft} />
            </div>
          ) : null
        }
        <div className={styles.title}>{title}</div>
        {
          iconRight ? (
            <div className={styles.icon} onClick={rightClick}>
              <SvgIcon name={iconRight} />
            </div>
          ) : null
        }
      </div>
    )
  }
}
